from pathlib import Path

from langchain_community.vectorstores import FAISS
from langchain_core.documents import Document

from app.rag.embedding_service import EmbeddingService


class VectorStoreService:
    def __init__(self):
        self.embedding_service = EmbeddingService()
        self.db_path = Path("data/faiss_index")

    def create_documents(
        self,
        chunks: list[str],
        filename: str,
    ) -> list[Document]:

        documents = []

        for index, chunk in enumerate(chunks):
            documents.append(
                Document(
                    page_content=chunk,
                    metadata={
                        "filename": filename,
                        "chunk_id": index,
                    },
                )
            )

        return documents

    def create_index(
        self,
        chunks: list[str],
        filename: str,
    ):

        documents = self.create_documents(chunks, filename)

        vectorstore = FAISS.from_documents(
            documents,
            self.embedding_service.embedding_model,
        )

        vectorstore.save_local(str(self.db_path))

        return vectorstore