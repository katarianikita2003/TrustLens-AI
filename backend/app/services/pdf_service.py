import fitz
from pathlib import Path

from app.utils.text_utils import clean_text


class PDFService:
    @staticmethod
    def extract_text(pdf_path: Path) -> str:
        """
        Extract and clean text from a PDF document.
        """

        document = fitz.open(pdf_path)

        text = ""

        for page in document:
            text += page.get_text()

        document.close()

        return clean_text(text)