const mqttClient = require('../mqttConfig.js');

module.exports = (req, res) => {
    mqttClient.publish('logout', "", () => {
        console.log(`Wysłano komunikat o wylogowaniu`)
    })
    res.clearCookie('accessToken')
    res.status(200).json({ message: 'Logout success' })
}