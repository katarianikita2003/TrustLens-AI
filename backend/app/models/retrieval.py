from pydantic import BaseModel


class RetrievalRequest(BaseModel):
    query: str
    k: int = 3


class RetrievalResult(BaseModel):
    score: float
    filename: str
    chunk_id: int
    content: str