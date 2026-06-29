from app.agents.compliance_agent import ComplianceAgent

agent = ComplianceAgent()

result = agent.analyze(
    title="Rechargeable Lithium Battery Pack",
    description="High-capacity lithium battery for drones."
)

print(type(result))

print(result)