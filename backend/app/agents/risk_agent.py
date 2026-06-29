class RiskAgent:

    def analyze(
        self,
        title: str,
        description: str,
        compliance_result: dict,
        image_analysis: dict,
    ):

        score = 0

        evidence = []

        # -------------------------
        # Compliance Decision
        # -------------------------

        if compliance_result.get("violation"):
            score += 40
            evidence.append("Marketplace policy violation detected.")

        confidence = compliance_result.get("confidence", 0)

        # Normalize confidence
        if confidence <= 1:
            confidence *= 100

        if confidence >= 90:
            score += 20

        elif confidence >= 70:
            score += 10

        # -------------------------
        # Vision Risk
        # -------------------------

        vision_risk = image_analysis.get("risk", "Low")

        if vision_risk == "High":
            score += 20
            evidence.append("Vision AI flagged high-risk content.")

        elif vision_risk == "Medium":
            score += 10

        # -------------------------
        # Policy Matches
        # -------------------------

        matched = compliance_result.get("matched_policies", [])

        score += min(len(matched) * 5, 20)

        # -------------------------
        # Sensitive Objects
        # -------------------------

        detected = image_analysis.get(
            "detected_object",
            "",
        ).lower()

        sensitive = [
            "passport",
            "credit card",
            "driving license",
            "identity card",
            "weapon",
            "gun",
            "knife",
            "medicine",
            "alcohol",
            "battery",
        ]

        if any(x in detected for x in sensitive):
            score += 20
            evidence.append(
                f"Sensitive object detected ({detected})."
            )

        score = min(score, 100)

        # -------------------------
        # Severity
        # -------------------------

        if score >= 80:

            severity = "Critical"

            category = "High Risk Listing"

            action = "Reject Listing"

        elif score >= 60:

            severity = "High"

            category = "Restricted Item"

            action = "Manual Review"

        elif score >= 30:

            severity = "Medium"

            category = "Needs Verification"

            action = "Review"

        else:

            severity = "Low"

            category = "Allowed Listing"

            action = "Approve"

        return {

            "risk_score": score,

            "risk_category": category,

            "severity": severity,

            "marketplace_action": action,

            "business_impact": (
                " | ".join(evidence)
                if evidence
                else "No significant compliance concerns."
            ),
        }