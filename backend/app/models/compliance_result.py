from pydantic import BaseModel


class ComplianceResult(BaseModel):
    violation: bool
    risk_score: int
    confidence: float
    reason: str
    evidence: list[str]