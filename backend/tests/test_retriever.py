from app.rag.retriever import RetrieverService

retriever = RetrieverService()

results = retriever.search(
    "Which policy mentions lithium batteries?"
)

print()

for i, (doc, score) in enumerate(results, start=1):
    print("=" * 60)
    print(f"Result {i}")
    print(f"Score: {score}")
    print(f"Metadata: {doc.metadata}")
    print()
    print(doc.page_content)
    print()