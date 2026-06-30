from pathlib import Path

from langchain_community.vectorstores import FAISS

from app.core.config import settings
from app.rag.demo_retriever import DemoRetriever


class RetrieverService:

    _vectorstore = None
    _demo_retriever = None

    def __init__(self):
        self.index_path = Path("data/faiss_index")

    def get_demo_retriever(self):

        if self.__class__._demo_retriever is None:

            print("Demo Mode Enabled - Using Demo Retriever")

            self.__class__._demo_retriever = DemoRetriever()

        return self.__class__._demo_retriever

    def get_vectorstore(self):

        if self.__class__._vectorstore is None:

            print("Loading FAISS Index...")

            # Lazy import - only when Full RAG is enabled
            from app.rag.embedding_service import EmbeddingService

            self.__class__._vectorstore = FAISS.load_local(
                str(self.index_path),
                EmbeddingService.get_model(),
                allow_dangerous_deserialization=True,
            )

            print("FAISS Loaded.")

        return self.__class__._vectorstore

    def search(
        self,
        query: str,
        k: int = 3,
    ):

        if settings.DEMO_MODE:
            return self.get_demo_retriever().search(
                query=query,
                k=k,
            )

        return self.get_vectorstore().similarity_search_with_score(
            query=query,
            k=k,
        )