from app.rag.embedding_service import EmbeddingService

embedding_service = EmbeddingService()

text = [
    "Lithium batteries are prohibited in certain products."
]

embedding = embedding_service.embed_documents(text)

print(f"Number of vectors: {len(embedding)}")
print(f"Embedding dimension: {len(embedding[0])}")
print()
print("First 10 values:")
print(embedding[0][:10])