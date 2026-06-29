class ExplainAgent:

    def analyze(
        self,
        title: str,
        description: str,
        compliance_result: dict,
        risk_result: dict,
    ):

        violation = compliance_result.get("violation", False)

        reason = compliance_result.get(
            "reason",
            "No explanation available."
        )

        action = risk_result.get(
            "marketplace_action",
            "Approve"
        )

        severity = risk_result.get(
            "severity",
            "Low"
        )

        category = risk_result.get(
            "risk_category",
            "Allowed Listing"
        )

        return {

            "summary": {

                "title": title,

                "decision": (
                    "Violation Detected"
                    if violation
                    else "No Violation"
                ),

                "severity": severity,

                "recommended_action": action,

            },

            "timeline": [

                {
                    "step": 1,
                    "event": "Product Submitted",
                    "description": (
                        f"Listing '{title}' was submitted "
                        "for compliance investigation."
                    ),
                },

                {
                    "step": 2,
                    "event": "Policy Retrieval",
                    "description": (
                        "Relevant marketplace policies were "
                        "retrieved using FAISS."
                    ),
                },

                {
                    "step": 3,
                    "event": "Compliance Decision",
                    "description": reason,
                },

                {
                    "step": 4,
                    "event": "Risk Assessment",
                    "description": (
                        f"Risk Category: {category}. "
                        f"Severity: {severity}."
                    ),
                },

                {
                    "step": 5,
                    "event": "Marketplace Action",
                    "description": (
                        f"Recommended Action: {action}."
                    ),
                },

            ],

            "final_reasoning": (
                reason
            ),
        }