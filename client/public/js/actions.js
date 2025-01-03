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
    refreshGames: function() {
        API.getAllGames().then(response => {
            document.querySelector("#cards").innerHTML = "" // reset games
            response.forEach(game => {
                document.querySelector("#cards").innerHTML += utils.card(game)
            });
        }).catch(alert)
    },
    joinGame: function (id) {
        API.joinGame(...utils.promptUser(["Name: "]), id).then((res) => {
            this.refreshGames()
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
        API.confirmPrepChoices(player, id).then((res) => {
            console.log(res);
        }).catch(alert)
    }
}