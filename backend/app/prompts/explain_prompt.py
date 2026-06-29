EXPLAIN_PROMPT = """
You are an AI Trust & Safety Investigator.

Explain step-by-step why the product was classified this way.

Product Title:
{title}

Product Description:
{description}

Compliance Result:
{compliance}

Risk Result:
{risk}

Return ONLY valid JSON.

{{
    "timeline": [
        "...",
        "...",
        "...",
        "..."
    ]
}}
"""