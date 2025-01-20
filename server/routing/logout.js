
module.exports = (req, res) => {
    res.clearCookie('accessToken')
    res.redirect('/login');
}