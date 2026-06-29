from langchain_huggingface import HuggingFaceEmbeddings
from app.core.config import settings


class EmbeddingService:

    _embedding_model = None

    @classmethod
    def get_model(cls):

        if cls._embedding_model is None:

            print("Loading embedding model...")

            cls._embedding_model = HuggingFaceEmbeddings(
                model_name=settings.EMBEDDING_MODEL,
                model_kwargs={"device": "cpu"},
                encode_kwargs={"normalize_embeddings": True},
            )

            print("Embedding model loaded.")

        return cls._embedding_model

    @classmethod
    def embed_documents(cls, texts):
        return cls.get_model().embed_documents(texts)

    @classmethod
    def embed_query(cls, query):
        return cls.get_model().embed_query(query)