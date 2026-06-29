from app.database.database import SessionLocal
from app.database.models import Investigation

db = SessionLocal()

rows = db.query(Investigation).all()

print(f"\nTotal investigations: {len(rows)}\n")

for row in rows:
    print("=" * 60)
    print("ID:", row.id)
    print("Title:", row.title)
    print("Violation:", row.violation)
    print("Risk Score:", row.risk_score)
    print("Risk Category:", row.risk_category)
    print("Created:", row.created_at)

db.close()