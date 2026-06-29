import numpy as np


def make_json_serializable(obj):

    if isinstance(obj, dict):
        return {
            k: make_json_serializable(v)
            for k, v in obj.items()
        }

    if isinstance(obj, list):
        return [
            make_json_serializable(v)
            for v in obj
        ]

    if isinstance(obj, np.ndarray):
        return obj.tolist()

    if isinstance(obj, np.generic):
        return obj.item()

    return obj