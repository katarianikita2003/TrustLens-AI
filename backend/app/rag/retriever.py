from pathlib import Path

from app.rag.embedding_service import EmbeddingService
from langchain_community.vectorstores import FAISS


class RetrieverService:
    def __init__(self):
        self.embedding_service = EmbeddingService()
        self.index_path = Path("data/faiss_index")

        self.vectorstore = FAISS.load_local(
            str(self.index_path),
            self.embedding_service.embedding_model,
            allow_dangerous_deserialization=True,
        )

    def search(
        self,
        query: str,
        k: int = 3,
    ):
        return self.vectorstore.similarity_search_with_score(
            query,
            k=k,
        )