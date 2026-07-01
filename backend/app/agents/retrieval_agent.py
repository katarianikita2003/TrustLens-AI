from app.rag.retriever_factory import get_retriever

class RetrievalAgent:

    _retriever = None

    def get_retriever(self):

        if self.__class__._retriever is None:

            print("Initializing Retriever Service...")

            self.__class__._retriever = get_retriever()

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

            policy_title = (
                doc.metadata.get("title")
                if doc.metadata.get("title")
                else doc.page_content.split(".")[0]
            )

            policies.append(
                {
                    "title": policy_title,
                    "content": doc.page_content,
                    "similarity": round((1 - score) * 100, 2),
                }
            )

        return policies