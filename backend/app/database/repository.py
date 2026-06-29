import json

from app.database.models import Investigation


class InvestigationRepository:

    def __init__(self, db):
        self.db = db

    def save(
        self,
        title: str,
        description: str,
        image_path: str | None,
        compliance: dict,
        risk: dict,
        report: dict,
     ):
        print("ENTER SAVE")
        investigation = Investigation(
        title=title,
        description=description,
        image_path=image_path,
        violation=compliance["violation"],
        risk_score=compliance["risk_score"],
        risk_category=risk["risk_category"],
        report_json=json.dumps(report),
        )
        print("ADDING")
        self.db.add(investigation)
         
        print("COMMITTING")
        self.db.commit()
         
        print("REFRESHING")
        self.db.refresh(investigation)

        return investigation


    def get_all(self):
        return self.db.query(Investigation).all()

    def get_by_id(self, investigation_id: int):
        return (
            self.db.query(Investigation)
            .filter(Investigation.id == investigation_id)
            .first()
        )