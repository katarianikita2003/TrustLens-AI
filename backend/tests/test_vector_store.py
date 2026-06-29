from app.rag.vector_store import VectorStoreService

chunks = [
    "Lithium batteries are prohibited.",
    "Counterfeit products are not allowed.",
    "Hazardous chemicals require approval."
]

vector_store = VectorStoreService()

vector_store.create_index(
    chunks=chunks,
    filename="policy.pdf",
)

print("FAISS index created successfully!")