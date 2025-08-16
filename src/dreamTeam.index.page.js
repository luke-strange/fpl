import { fetchIt } from "./assets/js/fetch.js";

export default async function* () {
    let bootstrap = await fetchIt("https://fantasy.premierleague.com/api/bootstrap-static/");
    let gw;
    for (const e of bootstrap.events) {
        if (e.is_current == true){
            gw = e.id;
            break
        }
    }
    if (gw != null) {
        let index = await fetchIt(`https://fantasy.premierleague.com/api/dream-team/${gw}/`);
        // let now = new Date(Date.now()).toLocaleString();
        let topPlayerId = index.top_player.id;
        yield {
            url: "/dream-team/",
            layout: 'templates/dreamTeam.vto',
            title: 'Dream team',
            gw,
            // updated: now,
            index,
            topPlayerId
        }
    }
}
