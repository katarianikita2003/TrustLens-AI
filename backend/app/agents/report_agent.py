import json


class ReportAgent:

    def run(self, compliance_result):

        return json.dumps(
            compliance_result,
            indent=4,
        )