let utils = {
    objToString: (obj) => {
        let text = ''
        for (const [key, value] of Object.entries(obj)) {
            text += `${key}: ${value}\n`
        }
        return text;
    },
    promptUser: (prompts) => prompts.map(p => prompt(p)),
    card: ({id, name, players, winner, time}) => {
        return `
        <div class="col">
            <div class="card border-4 border-info-subtle">
                <div class="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">Players: ${Object.values(players).map(p => " " + p.nickname)}</p>
                <a href="/game/${id}/prep">
                    <button onclick="actions.joinGame('${id}')" class="btn btn-outline-primary">Join game</button>
                </a>
                </div>
            </div>
        </div>`
    }
}