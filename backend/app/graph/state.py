from typing import TypedDict


class GraphState(TypedDict):
    title: str
    description: str

    retrieved_policies: list[str]

    compliance_result: dict | None

    report: dict | None