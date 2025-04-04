import { fetchIt } from "./assets/js/fetch.js";

export default async function* () {
    let index = await fetchIt("https://fantasy.premierleague.com/api/bootstrap-static/");
    let now = new Date(Date.now()).toLocaleString();
    yield {
        url: '/summary/',
        totalPlayers: index.total_players,
        title: 'Summary',
        layout: 'templates/gw_summary.vto',
        events: index.events,
        updated: now,

    };
    for (const team of index.teams) {
        yield {
            url: "/teams/" + `${team.short_name}`.toLowerCase() + "/",
            layout: 'templates/team.vto',
            title: team.name,
            tags: 'team',
            team
        };
    }
    for (const el of index.elements) {
        yield {
            url: "/players/" + el.id + "/",
            layout: 'templates/player.vto',
            title: el.first_name + ' ' + el.second_name,
            tags: 'player',
            updated: now,
            el
        };
    }
}
