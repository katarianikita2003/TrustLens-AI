import json

from PIL import Image

from app.prompts.compliance_prompt import COMPLIANCE_PROMPT
from app.services.llm_service import LLMService


class ComplianceAgent:

    def __init__(self):
        self.llm = LLMService()

    def run(
        self,
        title: str,
        description: str,
        policies: list[str],
        image_path: str,
        image_analysis: dict,
    ):

        policy_text = "\n\n".join(

            policy["content"]

            for policy in policies
        )

        prompt = COMPLIANCE_PROMPT.format(
            title=title,
            description=description,
            policies=policy_text,
                vision_analysis=json.dumps(
                image_analysis,
                indent=2
            ),
        )

        image = Image.open(image_path)

        result = self.llm.generate_multimodal(
            prompt,
            image,
        )

        result["retrieved_policies"] = policies

        return result