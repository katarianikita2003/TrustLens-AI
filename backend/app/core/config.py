from pydantic_settings import BaseSettings, SettingsConfigDict
import os
from dotenv import load_dotenv

load_dotenv()


class Settings(BaseSettings):
    # ============================
    # LLM Configuration
    # ============================

    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY")
    GEMINI_MODEL: str = "gemini-2.5-flash"

    # ============================
    # RAG Configuration
    # ============================

    EMBEDDING_MODEL: str = (
        "sentence-transformers/all-MiniLM-L6-v2"
    )

    VECTOR_DB: str = "faiss"

    # Demo mode disables FAISS +
    # HuggingFace embeddings and
    # uses lightweight demo policies.
    DEMO_MODE: bool = False

    # ============================
    # Database
    # ============================

    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "sqlite:///trustlens.db",
    )

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
    )


settings = Settings()