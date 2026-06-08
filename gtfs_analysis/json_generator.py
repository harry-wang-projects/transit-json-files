import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import json


trips = pd.read_csv("../hk_gtfs/trips.txt")
stop_times = pd.read_csv("../hk_gtfs/stop_times.txt")
stops = pd.read_csv("../hk_gtfs/stops.txt")
frequencies = pd.read_csv("../hk_gtfs/frequencies.txt")

def generate_branch_json(route_id, service_id):
    specific_trips = trips[(trips["route_id"] == route_id) & (trips["service_id"] == service_id)]
    print((str(route_id) + '-1'))

    # df['col'] is your original column
    #parts = trips['rou'].astype(str).str.split('-', expand=True)

    #df[['a', 'b', 'c', 'd']] = parts

    # (optional) convert to integers
    #df[['a', 'b', 'c', 'd']] = df[['a', 'b', 'c', 'd']].astype(int)

    specific_trips_1 = specific_trips[specific_trips["trip_id"].str.contains(str(route_id) + '-1', case=False, na=False)]
    specific_trips_2 = specific_trips[specific_trips["trip_id"].str.contains(str(route_id) + '-2', case=False, na=False)]

    #specific_trips_1 = specific_trips.loc[:, [trip_id for trip_id in specific_trips.trip_id if (str(route_id) + '-1') in trip_id]]
    #specific_trips_2 = specific_trips.loc[:, [trip_id for trip_id in specific_trips.trip_id if (str(route_id) + '-2') in trip_id]]
    #specific_trips_2 = specific_trips.filter(like=(str(route_id) + '-2'))

    specific_trips_1 = specific_trips_1.sort_values(by="trip_id")
    specific_trips_2 = specific_trips_2.sort_values(by="trip_id")

    parts = specific_trips_1["trip_id"].str.split('-', expand = True)
    specific_trips_1[["routeid_repeat", "dir", "serviceid_repeat", "trip_time"]] = parts
    specific_trips_1 = specific_trips_1.drop(columns = ["routeid_repeat", "serviceid_repeat"])
    parts = specific_trips_2["trip_id"].str.split('-', expand = True)
    specific_trips_2[["routeid_repeat", "dir", "serviceid_repeat", "trip_time"]] = parts
    specific_trips_2 = specific_trips_2.drop(columns = ["routeid_repeat", "serviceid_repeat"])

    print(specific_trips_1)
    print(specific_trips_2)


    return {"property": "idk"}

generate_branch_json(2002580, 287)