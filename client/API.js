let API = {
    api: axios.create({ baseURL: "http://localhost:3000/api" }),
    getGame: function(id) {
        return this.api.get(`/game/${id}`)
            .then(response => response.data)
    },
    getAllGames: function() {
        return this.api.get(`/game/`)
            .then(response => response.data)
    },
    createGame: function(creator, name) {
        return this.api.post(`/game/create?creator=${creator}&name=${name}`)
        .then(response => response.data)
    },
    joinGame: function(joiner, id) {
        return this.api.put(`/game/${id}/join?joiner=${joiner}`)
        .then(response => response.data)
    },
    makePrepChoice: function(player, id, ship) {
        return this.api.put(`/game/${id}/prep?player=${player}`,
            new URLSearchParams({ ship })).then(response => response.data)
    },
    clearPrepChoices: function(player, id) {
        return this.api.delete(`/game/${id}/prep?player=${player}`)
        .then(response => response.data)
    },
    confirmPrepChoices: function(player, id) {
        return this.api.post(`/game/${id}/prep?player=${player}`)
        .then(response => response.data)
    },
    makeMove: function(player, id, move) {
        return this.api.put(`/game/${id}?player=${player}`,
            new URLSearchParams({ move })).then(response => response.data)
    }
}