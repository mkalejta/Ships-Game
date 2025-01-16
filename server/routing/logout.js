
module.exports = (req, res) => {
    res.clearCookie('accessToken')
    res.status(200).json({ message: 'Logout success' })
}