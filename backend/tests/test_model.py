from app.models.compliance_result import ComplianceResult

result = ComplianceResult(
    violation=True,
    risk_score=95,
    confidence=0.98,
    reason="Lithium batteries are prohibited.",
    evidence=[
        "Policy: Lithium batteries are prohibited."
    ]
)

print(result)

print("\nJSON:\n")

print(result.model_dump_json(indent=4))