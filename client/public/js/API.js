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
    createGame: function() {
        return this.api.post(`/game/create`)
        .then(response => response.data)
    },
    joinGame: function(id) {
        return this.api.put(`/game/${id}/join`)
        .then(response => response)
    },
    makePrepChoice: function(player, id, parts) {
        return this.api.put(`/game/${id}/prep?player=${player}`, parts)
        .then(response => response.data)
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
        return this.api.put(`/game/${id}?player=${player}`, move)
        .then(response => response.data)
    },
    logout: function() {
        return this.api.get('/logout')
        .then(response => response.data)
    }
}