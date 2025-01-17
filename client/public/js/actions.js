let actions = {
    createGame: function() {
        const inputs = utils.promptUser(["Name: ", "Game name: "])
        if (inputs.every(e => e)) {
            API.createGame(...inputs).then((res) => {
                this.refreshGames()
            }).catch(alert)
        } else {
            alert("Please enter all the fields correctly!")
        }
    },
    joinGame: function(id) {
        API.joinGame(id).then((res) => {
            this.refreshGames()
        }).catch(alert)
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
    makePrepChoice: function(id, parts) {
        API.makePrepChoice(id, parts).then((res) => {
            console.log(res);
        }).catch(alert)
    },
    prepClear: function(id) {
        API.clearPrepChoices(id).then((res) => {
            console.log(res);
        }).catch(alert);
    },
    prepConfirm: function(id) {
        API.confirmPrepChoices(id).then((res) => {
            console.log(res);
        }).catch(alert)
    },
    gameState: function(id) {
        return API.getGame(id).then((res) => {
            return {...res};
        }).catch(alert);
    },
    makeMove: function(id, move) {
        API.makeMove(id, move).then((res) => res).catch(alert);
    }
}