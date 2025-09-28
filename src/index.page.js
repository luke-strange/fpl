import { fetchIt } from "./assets/js/fetch.js";

export default async function* () {
    let bootstrap = await fetchIt("https://fantasy.premierleague.com/api/bootstrap-static/");
    let now = new Date(Date.now()).toLocaleString();
    // yield {
    //     url: '/summary/',
    //     totalPlayers: bootstrap.total_players,
    //     title: 'Summary',
    //     layout: 'templates/gw_summary.vto',
    //     events: bootstrap.events,
    //     updated: now,
    //     chartData: [chartX.map(String), chartY.map(Number)]
    // };
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
            url: "/",
            layout: 'templates/dreamTeam.vto',
            title: 'Home',
            gw,
            // updated: now,
            index,
            topPlayerId
        }
    }
    for (const team of bootstrap.teams) {
        yield {
            url: "/teams/" + `${team.short_name}`.toLowerCase() + "/",
            layout: 'templates/team.vto',
            title: team.name,
            tags: 'team',
            team
        };
    }
    const price_changes = [];
    for (const el of bootstrap.elements) {
        if (el.cost_change_event != 0 && el.cost_change_event != null){
            price_changes.push({"id": el.id, "cost_change_event": el.cost_change_event/10});
        }
        let detailedPlayerData = await fetchIt(`https://fantasy.premierleague.com/api/element-summary/${el.id}/`);
        yield {
            url: "/players/" + el.id + "/",
            layout: 'templates/player.vto',
            title: el.first_name + ' ' + el.second_name,
            tags: 'player',
            updated: now,
            el,
            detailedPlayerData
        };
    }
    yield {
        url: "/price-changes/",
        layout: 'templates/transfers/price_changes.vto',
        title: 'Price changes',
        price_changes,
        updated: now
    }
}
