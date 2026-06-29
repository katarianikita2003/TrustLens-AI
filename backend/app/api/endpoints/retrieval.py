from fastapi import APIRouter

from app.models.retrieval import RetrievalRequest
from app.rag.retriever import RetrieverService

router = APIRouter()

retriever = RetrieverService()


@router.post("/retrieve")
def retrieve(request: RetrievalRequest):
    results = retriever.search(
        query=request.query,
        k=request.k,
    )

    response = []

    for doc, score in results:
        response.append(
            {
                "score": float(score),
                "filename": doc.metadata["filename"],
                "chunk_id": doc.metadata["chunk_id"],
                "content": doc.page_content,
            }
        )

    return response