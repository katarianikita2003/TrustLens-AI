import json
from typing import TypedDict

from langgraph.graph import END
from langgraph.graph import START
from langgraph.graph import StateGraph

from app.agents.retrieval_agent import RetrievalAgent
from app.agents.compliance_agent import ComplianceAgent
from app.agents.report_agent import ReportAgent
from app.agents.risk_agent import RiskAgent
from app.agents.explain_agent import ExplainAgent
from app.database.database import SessionLocal
from app.database.repository import InvestigationRepository
from app.agents.image_agent import image_agent
from app.utils.json_utils import make_json_serializable

retrieval_agent = RetrievalAgent()
compliance_agent = ComplianceAgent()
report_agent = ReportAgent()
risk_agent = RiskAgent()
explain_agent = ExplainAgent()

class GraphState(TypedDict):
    title: str
    description: str

    retrieved_policies: list

    compliance_result: dict | None

    risk_result: dict | None

    explanation: dict | None

    report: dict | None
    
    image_path: str | None
    image_analysis: dict


def retrieve_node(state: GraphState):

    print("Retrieving policies...")

    policies = retrieval_agent.run(
        state["title"],
        state["description"],
    )

    return {
        "retrieved_policies": policies
    }


def compliance_node(state: GraphState):

    print("Running Compliance Agent...")

    result = compliance_agent.run(
        title=state["title"],
        description=state["description"],
        policies=state["retrieved_policies"],
        image_path=state["image_path"],
        image_analysis=state["image_analysis"],
    )

    return {
        "compliance_result": result
    }

def risk_node(state: GraphState):

    print("Running Risk Agent...")

    result = risk_agent.analyze(
        title=state["title"],
        description=state["description"],
        compliance_result=state["compliance_result"],
        image_analysis=state["image_analysis"],
    )

    return {
        "risk_result": result
    }

def report_node(state: GraphState):

    print("Generating Final Report...")

    report = {
        "compliance": state["compliance_result"],
        "image_analysis": state["image_analysis"],
        "risk": state["risk_result"],
        "explanation": state["explanation"],
    }
    
    report = make_json_serializable(report)

    db = SessionLocal()

    try:
        repository = InvestigationRepository(db)
        
        print("===== SAVING TO DATABASE =====")
        
        print(report)
        print(type(report))
        
        import pprint
        pprint.pprint(report)
        
        json.dumps(report)

        print("REPORT IS JSON SERIALIZABLE")
        
        repository.save(
            title=state["title"],
            description=state["description"],
            image_path=state.get("image_path"),
            compliance=report["compliance"],
            risk=report["risk"],
            report=report,
        )

    finally:
        db.close()

    return {
        "report": report
    }

def explain_node(state: GraphState):

    print("Generating Explanation...")

    explanation = explain_agent.analyze(
        title=state["title"],
        description=state["description"],
        compliance_result=state["compliance_result"],
        risk_result=state["risk_result"],
    )

    return {
        "explanation": explanation
    }
    
def image_node(state):

    print("Running Image Agent...")

    result = image_agent.analyze(
        state.get("image_path")
    )

    return {
        "image_analysis": result
    }

builder = StateGraph(GraphState)

builder.add_node("retrieve", retrieve_node)
builder.add_node("compliance", compliance_node)
builder.add_node("risk", risk_node)
builder.add_node("report", report_node)
builder.add_node("explain", explain_node)
builder.add_node("image", image_node)

builder.add_edge(START, "retrieve")
builder.add_edge("retrieve", "image")
builder.add_edge("image", "compliance")
builder.add_edge("compliance", "risk")
builder.add_edge("risk", "explain")
builder.add_edge("explain", "report")
builder.add_edge("report", END)

workflow = builder.compile()