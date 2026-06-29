from app.agents.compliance_agent import ComplianceAgent

agent = ComplianceAgent()

prompt = agent.build_prompt(
    title="Rechargeable Lithium Battery Pack",
    description="High-capacity lithium battery for drones.",
    policies="Lithium batteries are prohibited.",
)

print(prompt)