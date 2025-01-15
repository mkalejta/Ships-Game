const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token) {
        return res.status(401).json({ error: 'No token found' })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' })
        }

        req.user = {
            id: payload.id
        }
        
        next();
    })
};