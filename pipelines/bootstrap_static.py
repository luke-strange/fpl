import json
from pathlib import Path

import requests

ROOT = Path.cwd()


def get_bootstrap_static():
    return requests.get("https://fantasy.premierleague.com/api/bootstrap-static/")


def get_element_summary(element):
    res = requests.get(
        f"https://fantasy.premierleague.com/api/element-summary/{element}/"
    )
    if res.status_code == 200:
        d = res.json()
    else:
        d = {}
        print(f"Couldn't get data for {element}, {res.status_code}")
    return d


if __name__ == "__main__":
    res = get_bootstrap_static()
    if res.status_code == 200:
        data = res.json()
        elements = data["elements"]
        player_codes = {
            e["id"]: {
                "web_name": e["web_name"],
                "full_name": e["first_name"] + " " + e["second_name"],
                "team": e["team"]
            }
            for e in elements
        }
        with open(ROOT / "src/_data/lookups/playerCode2Name.json", "w") as f:
            json.dump(player_codes, f)

        element_stats = {es["name"]: es["label"] for es in data["element_stats"]}
        with open(ROOT / "src/_data/lookups/element_stats.json", "w") as f:
            json.dump(element_stats, f)

        teams = {
            t["id"]: {"name": t["name"], "short_name": t["short_name"]}
            for t in data["teams"]
        }
        with open(ROOT / "src/_data/lookups/teams.json", "w") as f:
            json.dump(teams, f)
    else:
        print(res.status_code)
    es = {}
    for i in range(1, len(elements) + 1):
        # only really need to do this per team...
        element_summary = get_element_summary(element=i)
        es.update({i: element_summary})
    with open(ROOT / "src/_data/elements/detailedPlayerData.json", "w") as f:
        json.dump(es, f)
