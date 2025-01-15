
class User {

    constructor(nickname, password) {
        this.nickname = nickname
        this.password = password
        this.logged = false
        this.ranking = 0
    }
}

module.exports = User;