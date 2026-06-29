from pathlib import Path
import shutil

from fastapi import APIRouter, File, HTTPException, UploadFile

from app.services.pdf_service import PDFService
from app.services.chunk_service import ChunkService

router = APIRouter()

UPLOAD_DIR = Path("data/policies")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


@router.post("/upload-policy")
async def upload_policy(file: UploadFile = File(...)):
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed."
        )

    destination = UPLOAD_DIR / file.filename

    with destination.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    extracted_text = PDFService.extract_text(destination)

    chunk_service = ChunkService()

    chunks = chunk_service.split(extracted_text)

    return {
    "filename": file.filename,
    "characters": len(extracted_text),
    "chunks": len(chunks),
    "first_chunk": chunks[0][:500],
    "message": "Policy uploaded, parsed and chunked successfully."
}