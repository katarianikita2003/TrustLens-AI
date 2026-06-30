from app.rag.retriever import RetrieverService


class RetrievalAgent:

    _retriever = None

    def get_retriever(self):

        if self.__class__._retriever is None:

            print("Initializing Retriever Service...")

            self.__class__._retriever = RetrieverService()

        return self.__class__._retriever

    def run(
        self,
        title: str,
        description: str,
    ):

        query = f"{title}\n{description}"

        results = self.get_retriever().search(query)

        policies = []

        for doc, score in results:

            title = (
                doc.metadata.get("title")
                if doc.metadata.get("title")
                else doc.page_content.split(".")[0]
            )

            policies.append(
                {
                    "title": title,
                    "content": doc.page_content,
                    "similarity": round((1 - score) * 100, 2),
                }
            )

        return policies