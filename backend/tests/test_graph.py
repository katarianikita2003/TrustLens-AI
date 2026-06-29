from app.graph.workflow import workflow

result = workflow.invoke(
    {
        "title": "Rechargeable Lithium Battery Pack",
        "description": "High-capacity lithium battery for drones."
    }
)

print("\n\n========== FINAL REPORT ==========\n")
print(result["report"])