from fastapi import APIRouter

from app.models.investigation import InvestigationRequest
from app.graph.workflow import workflow

router = APIRouter()


@router.post("/investigate")
def investigate(request: InvestigationRequest):

    result = workflow.invoke(
        {
            "title": request.title,
            "description": request.description,
            "retrieved_policies": [],
            "compliance_result": None,
            "report": None,
        }
    )

    return {
        "status": "success",
        "report": result["compliance_result"],
    }