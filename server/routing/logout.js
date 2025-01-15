
module.exports = (req, res) => {
    res.clearCookie('access_token')
    res.status(200).json({ message: 'Logout success' })
}