from sqlalchemy import Boolean
from sqlalchemy import Column
from sqlalchemy import DateTime
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text
from sqlalchemy.sql import func

from app.database.database import Base


class Investigation(Base):
    __tablename__ = "investigations"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String)

    description = Column(Text)
    
    image_path = Column(String, nullable=True)

    violation = Column(Boolean)

    risk_score = Column(Integer)

    risk_category = Column(String)

    report_json = Column(Text)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )