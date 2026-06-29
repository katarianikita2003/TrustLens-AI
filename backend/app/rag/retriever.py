from pathlib import Path

from langchain_community.vectorstores import FAISS

from app.rag.embedding_service import EmbeddingService


class RetrieverService:

    _vectorstore = None

    def __init__(self):
        self.index_path = Path("data/faiss_index")

    def get_vectorstore(self):

        if self.__class__._vectorstore is None:

            print("Loading FAISS Index...")

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

        return self.get_vectorstore().similarity_search_with_score(
            query,
            k=k,
        )