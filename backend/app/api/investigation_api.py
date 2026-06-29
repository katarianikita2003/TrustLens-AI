from fastapi import APIRouter
from fastapi import HTTPException

import json
import os
import shutil

from app.database.database import SessionLocal
from app.database.repository import InvestigationRepository

from app.graph.workflow import workflow
from app.models.request_models import ProductRequest
from fastapi import UploadFile, File, Form

router = APIRouter()


@router.get("/")
def home():
    return {
        "message": "TrustLens AI Backend Running"
    }

@router.post("/analyze")
async def analyze_product(
    title: str = Form(...),
    description: str = Form(...),
    image: UploadFile | None = File(None),
):
    image_path = None

    if image:
        os.makedirs("uploads/images", exist_ok=True)

        image_path = f"uploads/images/{image.filename}"

        with open(image_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)

    result = workflow.invoke(
        {
            "title": title,
            "description": description,
            "image_path": image_path,
        }
    )

    return result["report"]

@router.get("/investigations")
def get_investigations():

    db = SessionLocal()

    repo = InvestigationRepository(db)

    investigations = repo.get_all()

    db.close()

    return investigations

@router.get("/investigations/{investigation_id}")
def get_investigation(investigation_id: int):

    db = SessionLocal()

    repo = InvestigationRepository(db)

    investigation = repo.get_by_id(investigation_id)

    db.close()

    if investigation is None:
        raise HTTPException(
            status_code=404,
            detail="Investigation not found",
        )

    report = {}

    if investigation.report_json:
        report = json.loads(investigation.report_json)

    return {
        "id": investigation.id,
        "title": investigation.title,
        "description": investigation.description,
        "image_path": investigation.image_path,
        "violation": investigation.violation,
        "risk_score": investigation.risk_score,
        "category": investigation.risk_category,
        "created_at": investigation.created_at,
        "report": report,
    }