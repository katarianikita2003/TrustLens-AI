from app.rag.retriever import RetrieverService


class RetrievalAgent:

    def __init__(self):
        self.retriever = RetrieverService()

    def run(self, title: str, description: str):

        query = f"{title}\n{description}"

        results = self.retriever.search(query)

        policies = []

        for doc, score in results:

            policies.append(
                {
                    "title": doc.page_content.split(".")[0],

                    "content": doc.page_content,

                    "similarity": float(
                        round((1 - score) * 100, 2)
                    )
                }
            )

        return policies