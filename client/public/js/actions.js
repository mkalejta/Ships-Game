let actions = {
    createGame: function(player) {
        const inputs = utils.promptUser(["Game name: "])
        if (inputs.every(e => e)) {
            return API.createGame(player, ...inputs).then((res) => {
                this.refreshGames()
                return res
            }).catch(alert)
        } else {
            alert("Please enter all the fields correctly!")
        }
    },
    refreshGames: function(search) {
        API.getAllGames().then(response => {
            document.querySelector("#cards").innerHTML = "" // reset games
            const regex = RegExp(search, "i")
            response.forEach(game => {
                if (regex.test(game.name)) {
                    document.querySelector("#cards").innerHTML += utils.card(game)
                }
            });
        }).catch(alert)
    },
    makePrepChoice: function(player, id, parts) {
        API.makePrepChoice(player, id, parts).then((res) => {
            console.log(res);
        }).catch(alert)
    },
    prepClear: function(player, id) {
        API.clearPrepChoices(player, id).then((res) => {
            console.log(res);
        }).catch(alert);
    },
    prepConfirm: function(player, id) {
        API.confirmPrepChoices(player ,id).then((res) => {
            console.log(res);
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