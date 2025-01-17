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
    createGame: function(player, gameName) {
        return this.api.post(`/game/`, {...player, gameName})
        .then(response => {
            return response.request.responseURL
        })
    },
    joinGame: function(player, id) {
        return this.api.put(`/game/${id}/join`, player)
        .then(response => response)
    },
    makePrepChoice: function(player, id, parts) {
        return this.api.put(`/game/${id}/prep`, {...parts, player})
        .then(response => response.data)
    },
    clearPrepChoices: function(player, id) {
        return this.api.delete(`/game/${id}/prep`, player)
        .then(response => response.data)
    },
    confirmPrepChoices: function(player, id) {
        return this.api.post(`/game/${id}/prep`, player)
        .then(response => response.data)
    },
    makeMove: function(player, id, move) {
        return this.api.put(`/game/${id}`, {...move, player})
        .then(response => response.data)
    },
    logout: function() {
        return this.api.get('/logout')
        .then(response => response.data)
    }
}