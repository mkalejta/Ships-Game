let actions = {
    createGame: function(player) {
        const inputs = utils.promptUser(["Game name: "])
        if (inputs.every(e => e)) {
            return API.createGame(player, ...inputs).then((res) => {
                return res
            }).catch(alert)
        } else {
            alert("Please enter all the fields correctly!")
        }
    },
    refreshGames: function(games, search) {
        document.querySelector("#cards").innerHTML = "" // reset games
        const regex = RegExp(search, "i")
        games.forEach(game => {
            if (regex.test(game.name)) {
                document.querySelector("#cards").innerHTML += utils.card(game)
            }
        });
    },
    makePrepChoice: function(player, id, parts) {
        API.makePrepChoice(player, id, parts).then((res) => {
        }).catch(alert)
    },
    prepClear: function(player, id) {
        API.clearPrepChoices(player, id).then((res) => {
        }).catch(alert);
    },
    prepConfirm: function(player, id) {
        API.confirmPrepChoices(player ,id).then((res) => {
        }).catch(alert)
    },
    gameState: function(id) {
        return API.getGame(id).then((res) => {
            return {...res};
        }).catch(alert);
    },
    makeMove: function(player, id, move) {
        API.makeMove(player, id, move).then((res) => res).catch(alert);
    }
}