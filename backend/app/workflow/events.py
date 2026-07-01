from datetime import datetime


class WorkflowEvents:

    def __init__(self):
        self.events = []

    def emit(self, agent, status):

        self.events.append(
            {
                "agent": agent,
                "status": status,
                "time": datetime.now().strftime("%H:%M:%S"),
            }
        )

    def get_events(self):
        return self.events

    def clear(self):
        self.events.clear()