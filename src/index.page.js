import { fetchIt } from "./assets/js/fetch.js";

export default async function* () {
    let index = await fetchIt("https://fantasy.premierleague.com/api/bootstrap-static/");
    let now = new Date(Date.now()).toLocaleString();
    const chartX = [];
    const chartY = [];
    for (const e of index.events){
        if (e.finished == true){
            chartX.push(e.name);
            chartY.push(e.average_entry_score);
        }
    }
    // yield {
    //     url: '/summary/',
    //     totalPlayers: index.total_players,
    //     title: 'Summary',
    //     layout: 'templates/gw_summary.vto',
    //     events: index.events,
    //     updated: now,
    //     chartData: [chartX.map(String), chartY.map(Number)]
    // };
    for (const team of index.teams) {
        yield {
            url: "/teams/" + `${team.short_name}`.toLowerCase() + "/",
            layout: 'templates/team.vto',
            title: team.name,
            tags: 'team',
            team
        };
    }
    const price_changes = [];
    for (const el of index.elements) {
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
