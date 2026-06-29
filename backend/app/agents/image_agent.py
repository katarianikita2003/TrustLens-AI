from PIL import Image

from app.services.llm_service import LLMService


class ImageComplianceAgent:

    def __init__(self):
        self.llm = LLMService()

    def analyze(self, image_path: str | None):

        if image_path is None:
            return {
                "detected_object": None,
                "confidence": 0,
                "risk": "Unknown",
                "reason": "No image uploaded.",
            }

        image = Image.open(image_path)

        result = self.llm.analyze_image(image)

        return result


image_agent = ImageComplianceAgent()