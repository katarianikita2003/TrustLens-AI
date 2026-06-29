from fastapi import APIRouter

from app.agents.compliance_agent import ComplianceAgent
from app.models.product_request import ProductRequest

router = APIRouter()

agent = ComplianceAgent()


@router.post("/analyze-product")
def analyze_product(product: ProductRequest):
    return agent.analyze(
        title=product.title,
        description=product.description,
    )