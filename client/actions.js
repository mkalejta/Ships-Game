const { RedirectHandler } = require("undici-types")

let actions = {
    createGame: function() {
        const inputs = utils.promptUser(["Name: ", "Game name: "])
        if (inputs.every(e => e)) {
            API.createGame(...inputs).then(response => {
                alert("Created game successfully!")
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
        API.joinGame(...utils.promptUser(["Name: "]), id)
            .then((response) => {
                this.refreshGames()
                alert(`${Object.keys(response.players)[1]} joined ${response.name}.`)
            }).catch(alert)
    }
}