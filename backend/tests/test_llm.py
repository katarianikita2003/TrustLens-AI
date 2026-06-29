from app.services.llm_service import LLMService

llm = LLMService()

response = llm.generate(
    "Reply with exactly these two words: Hello TrustLens"
)

print(response)