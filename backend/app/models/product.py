from pydantic import BaseModel


class ProductInput(BaseModel):
    title: str
    description: str