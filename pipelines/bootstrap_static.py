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
        
        player_codes = {e["id"]: e["web_name"] for e in data["elements"]}
        with open(ROOT / "data/lookups/player_codes.json", "w") as f:
            json.dump(player_codes, f)

        element_stats = {es["name"]: es["label"] for es in data["element_stats"]}
        with open(ROOT / "data/lookups/element_stats.json", "w") as f:
            json.dump(element_stats, f)
    else:
        print(res.status_code)