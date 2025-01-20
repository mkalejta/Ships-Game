let utils = {
    objToString: (obj) => {
        let text = ''
        for (const [key, value] of Object.entries(obj)) {
            text += `${key}: ${value}\n`
        }
        return text;
    },
    promptUser: (prompts) => prompts.map(p => prompt(p)),
    card: (player, {id, name, players, winner, time}) => {
        if (winner) {
            return `
            <div class="col">
                <div class="card border-4 border-danger-subtle">
                    <div class="card-body d-flex flex-column justify-content-evenly align-items-center" style="font-style: italic;">
                        <h4 class="card-title text-danger" style="font-weight: bold;">${name}</h4>
                        <p class="card-text">Players: ${Object.values(players).map(p => " " + p.nickname)}</p>
                        <p class="card-text text-danger" style="font-weight: bold; font-size: 1.2rem;">Winner: ${winner}</p>
                        <p class="card-text" style="font-style: italic;">Finished: ${time}</p>
                    </div>
                </div>
            </div>`
        } else {
            const backToTheGame = (Object.values(players).map(p => p.nickname).includes(player)) ? 
                `<button id="${id}" class="btn btn-outline-secondary" name="back-to-the-game-button">Back to the game</button>` : 
                `<button class="btn btn-secondary disabled">Full of Players</button>`;
            return (Object.keys(players).length === 2) ? 
                `
                <div class="col">
                    <div class="card border-4 border-warning-subtle open-game">
                        <div class="card-body d-flex flex-column justify-content-evenly align-items-center">
                            <h4 class="card-title text-warning" style="font-style: italic; font-weight: bold;">${name}</h4>
                            <p class="card-text">Players: ${Object.values(players).map(p => " " + p.nickname)}</p>
                            ${backToTheGame}
                            <p class="card-text" style="font-style: italic;">Created: ${time}</p>
                        </div>
                    </div>
                </div>` :
                `
                <div class="col">
                    <div class="card border-4 border-info-subtle open-game">
                        <div class="card-body d-flex flex-column justify-content-evenly align-items-center">
                            <h4 class="card-title text-info" style="font-style: italic; font-weight: bold;">${name}</h4>
                            <p class="card-text">Players: ${Object.values(players).map(p => " " + p.nickname)}</p>
                            <button id="${id}" class="btn btn-outline-primary" name="join-button">Join game</button>
                            <p class="card-text" style="font-style: italic;">Created: ${time}</p>
                        </div>
                    </div>
                </div>`
        }
    }
}