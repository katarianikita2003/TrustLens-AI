from difflib import SequenceMatcher

from langchain_core.documents import Document

from app.rag.demo_policies import POLICIES


class DemoRetriever:

    def similarity(self, query: str, text: str) -> float:
        return SequenceMatcher(
            None,
            query.lower(),
            text.lower(),
        ).ratio()

    def search(self, query: str, k: int = 3):

        scored = []

        for policy in POLICIES:

            score = self.similarity(
                query,
                policy["content"],
            )

            scored.append(
                (
                    Document(
                        page_content=policy["content"],
                        metadata={
                            "title": policy["title"]
                        },
                    ),
                    1 - score,
                )
            )

        scored.sort(key=lambda x: x[1])

        return scored[:k]