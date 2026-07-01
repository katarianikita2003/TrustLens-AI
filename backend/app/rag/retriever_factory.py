from app.core.config import settings

from app.rag.retriever import RetrieverService
from app.rag.demo_retriever import DemoRetriever


def get_retriever():

    if settings.APP_MODE.lower() == "demo":

        print("Using Demo Retriever")

        return DemoRetriever()

    print("Using FAISS Retriever")

    return RetrieverService()