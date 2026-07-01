from pydantic_settings import BaseSettings, SettingsConfigDict
import os
from dotenv import load_dotenv

load_dotenv()


class Settings(BaseSettings):

    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY")

    GEMINI_MODEL: str = "gemini-2.5-flash"

    EMBEDDING_MODEL: str = (
        "sentence-transformers/all-MiniLM-L6-v2"
    )

    VECTOR_DB: str = "faiss"

    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "sqlite:///trustlens.db"
    )

    # NEW
    APP_MODE: str = os.getenv(
        "APP_MODE",
        "local"
    )

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore"
    )


settings = Settings()