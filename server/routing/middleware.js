const jwt = require('jsonwebtoken');

let serverStartTime = Date.now();

const middleware = (req, res, next) => {
    const token = req.cookies.accessToken

    if(!token) {
        console.log('No access token!')
        return res.redirect('/login')
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            
        if (decoded.iat * 1000 < serverStartTime) {
            return res.redirect('/login')
        }

        console.log('Access token valid')
        req.user = decoded;
        next();
    } catch (err) {
        return res.redirect('/login')
    }
};

module.exports = { middleware, resetServerStartTime: () => (serverStartTime = Date.now()) };