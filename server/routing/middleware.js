const jwt = require('jsonwebtoken');

let serverStartTime = Date.now();

const middleware = (req, res, next) => {
    const token = req.cookies.accessToken

    if(!token) {
        console.log('No access token!')
        return res.status(403).json({ error: 'Log in to get access!' })
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log('Access token valid')
            
        if (decoded.iat * 1000 < serverStartTime) {
            return res.status(401).json({ message: 'Session expired. Log in again.' });
        }

        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token.' });
    }
};

module.exports = { middleware, resetServerStartTime: () => (serverStartTime = Date.now()) };