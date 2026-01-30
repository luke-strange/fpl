import requests
import json
from pathlib import Path

ROOT = Path.cwd()

def get_bootstrap_static():
    return requests.get("https://fantasy.premierleague.com/api/bootstrap-static/")

if __name__ == "__main__":
    res = get_bootstrap_static()
    if res.status_code == 200:
        data = res.json()
        
        player_codes = {
            e["id"]: 
            {"web_name": e["web_name"], "full_name": e["first_name"] + " " + e["second_name"]} 
            for e in data["elements"]
        }
        with open(ROOT / "src/_data/lookups/playerCode2Name.json", "w") as f:
            json.dump(player_codes, f)

        element_stats = {es["name"]: es["label"] for es in data["element_stats"]}
        with open(ROOT / "src/_data/lookups/element_stats.json", "w") as f:
            json.dump(element_stats, f)
        
        teams = {t["id"]: {"name": t["name"], "short_name": ["short_name"]} for t in data["teams"]}
        with open(ROOT / "src/_data/lookups/element_stats.json", "w") as f:
            json.dump(element_stats, f)
    else:
        print(res.status_code)