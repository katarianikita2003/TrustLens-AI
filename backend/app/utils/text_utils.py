import re


def clean_text(text: str) -> str:
    """
    Clean extracted PDF text before chunking.
    """

    # Remove non-printable characters
    text = re.sub(r"[^\x20-\x7E\n\t]", " ", text)

    # Replace multiple spaces with one
    text = re.sub(r"[ ]+", " ", text)

    # Replace multiple blank lines
    text = re.sub(r"\n\s*\n+", "\n\n", text)

    return text.strip()