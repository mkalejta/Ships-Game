const bcrypt = require('bcrypt');
const saltRounds = 10;

class User {

    constructor(nickname, password) {
        this.nickname = nickname
        this.password = bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                throw Error('Unable to hash password')
            }

            console.log('Hashed password', hash);
        })
        this.logged = false
        this.ranking = 0
    }
}

module.exports = User;