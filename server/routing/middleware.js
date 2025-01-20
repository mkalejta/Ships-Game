const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token) {
        console.log('No access token!');
        res.locals.isAuthenticated = false;
        if (req._parsedUrl.path.includes('game')) {
            return res.redirect('/login')
        }
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log('Access token valid');
        req.user = decoded.nickname;
        res.locals.isAuthenticated = true;
        res.locals.user = decoded.nickname;
        next();
    } catch (err) {
        console.log('Invalid token!');
        res.locals.isAuthenticated = false;
        next();
    }
};