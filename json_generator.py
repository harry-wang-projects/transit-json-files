import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import json


trips = pd.read_csv("../hk_gtfs/trips.txt")
stop_times = pd.read_csv("../hk_gtfs/stop_times.txt")
stops = pd.read_csv("../hk_gtfs/stops.txt")
frequencies = pd.read_csv("../hk_gtfs/frequencies.txt")

def generate_branch_json(route_id, service_id):
    return json.dump({"property": "idk"})
