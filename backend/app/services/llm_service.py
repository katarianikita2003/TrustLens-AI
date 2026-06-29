import json
import re
import time

from PIL import Image
from google import genai

from app.core.config import settings


class LLMService:

    def __init__(self):
                self.client = genai.Client(
                    api_key=settings.GEMINI_API_KEY
                )

                self.model = settings.GEMINI_MODEL
                
    def generate_multimodal(
            self,
            prompt: str,
            image: Image.Image,
        ):

            response = self.client.models.generate_content(
                model=self.model,
                contents=[
                    prompt,
                    image,
                ],
            )

            text = response.text.strip()

            text = re.sub(r"^```json", "", text, flags=re.IGNORECASE).strip()
            text = re.sub(r"^```", "", text).strip()
            text = re.sub(r"```$", "", text).strip()

            try:

                return json.loads(text)

            except Exception:

                return {
                    "raw_response": text
                }

    def generate(self, prompt: str):

                response = self.client.models.generate_content(
                    model=self.model,
                    contents=prompt,
                )

                text = response.text.strip()

                text = re.sub(r"^```json", "", text, flags=re.IGNORECASE).strip()
                text = re.sub(r"^```", "", text).strip()
                text = re.sub(r"```$", "", text).strip()

                try:
                    return json.loads(text)

                except json.JSONDecodeError:
                    return {
                        "raw_response": text
                    }

    def analyze_image(self, image: Image.Image):

        prompt = """
You are an AI marketplace compliance investigator.

Analyze this product image.

Return ONLY valid JSON.

{
    "detected_object": "",
    "confidence": 0,
    "risk": "Low",
    "reason": ""
}
"""

        response = None

        for attempt in range(3):

            try:

                print(f"Gemini Vision Attempt {attempt + 1}")

                response = self.client.models.generate_content(
                    model=self.model,
                    contents=[
                        prompt,
                        image,
                    ],
                )

                break

            except Exception as e:

                print(f"Attempt {attempt + 1} failed:")
                print(e)

                if attempt == 2:

                    return {
                        "detected_object": "Unknown",
                        "confidence": 0,
                        "risk": "Unknown",
                        "reason": str(e),
                    }

                print("Retrying in 2 seconds...\n")
                time.sleep(2)
        
        text = response.text.strip()

        text = re.sub(r"^```json", "", text, flags=re.IGNORECASE).strip()
        text = re.sub(r"^```", "", text).strip()
        text = re.sub(r"```$", "", text).strip()

        try:
            result = json.loads(text)
        
            if result.get("confidence", 0) <= 1:
                result["confidence"] *= 100

            return result

        except Exception:

            return {
                "detected_object": "Unknown",
                "confidence": 0,
                "risk": "Unknown",
                "reason": text,
            }