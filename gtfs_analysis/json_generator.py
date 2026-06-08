import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import json


trips = pd.read_csv("../hk_gtfs/trips.txt")
stop_times = pd.read_csv("../hk_gtfs/stop_times.txt")
stops = pd.read_csv("../hk_gtfs/stops.txt")
frequencies = pd.read_csv("../hk_gtfs/frequencies.txt")

def generate_line_json(line_name, route_id, service_id):
    specific_trips = trips[(trips["route_id"] == route_id) & (trips["service_id"] == service_id)]
    print((str(route_id) + '-1'))

    # df['col'] is your original column
    #parts = trips['rou'].astype(str).str.split('-', expand=True)

    #df[['a', 'b', 'c', 'd']] = parts

    specific_trips_1 = specific_trips[specific_trips["trip_id"].str.contains(str(route_id) + '-1', case=False, na=False)]
    specific_trips_2 = specific_trips[specific_trips["trip_id"].str.contains(str(route_id) + '-2', case=False, na=False)]

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

    #stops
    route1 = stop_times[stop_times["trip_id"] == specific_trips_1.iloc[0]["trip_id"]]
    route2 = stop_times[stop_times["trip_id"] == specific_trips_2.iloc[0]["trip_id"]]

    route1_stops = route1.merge(stops[['stop_id', 'stop_name', 'stop_lat', 'stop_lon']], on = 'stop_id', how = 'left')
    route2_stops = route2.merge(stops[['stop_id', 'stop_name', 'stop_lat', 'stop_lon']], on = 'stop_id', how = 'left')

    print(route1_stops[['stop_id', 'stop_name']])
    print(route2_stops[['stop_id', 'stop_name']])
    print(route1_stops[['arrival_time', 'departure_time']])
    print(route2_stops[['arrival_time', 'departure_time']])

    #frequencies
    frequencies_1 = specific_trips_1.merge(frequencies[['trip_id', 'start_time', 'end_time', 'headway_secs']])
    frequencies_1 = frequencies_1.drop(columns=['service_id', 'dir'])
    frequencies_2 = specific_trips_2.merge(frequencies[['trip_id', 'start_time', 'end_time', 'headway_secs']])
    frequencies_2 = frequencies_2.drop(columns=['service_id', 'dir'])
    print(frequencies_1)

    to_return = {
        "line_id": 100,
        "name": line_name,
        "line_color":'#ffff00',
        "branches": [
            {
                "branch_id": 0,
                "SPAWN_EVERY": 300,
                "branch_type": "unidirectional",
                "scheduling": "scheduled_frequencies",
                "stations": [
                ],
            },
            {
                "branch_id": 1,
                "SPAWN_EVERY": 300,
                "branch_type": "unidirectional",
                "scheduling": "scheduled_frequencies",
                "stations": [
                ],
            }
        ]
    }

    return to_return

print(generate_line_json('58', 2002580, 287))