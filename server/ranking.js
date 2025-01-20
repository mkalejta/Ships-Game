const db = require('./db.js');
const mqttClient = require('./mqttConfig.js');
const Topic = "ranking";

mqttClient.subscribe(Topic, () => {
    console.log('Zasubskrybowano ranking')
})

mqttClient.on("message", async (topic, message) => {
    let data = await db.getData("/users");
    const [ winner, selfSinkedShips ] = message.toString().split('/');

    if (topic === Topic) {
    
        for (let i = 0; i < data.length; i++) {
            if(data[i].nickname === winner) {
                data[i].ranking += 100 - (Number(selfSinkedShips) * 10)
                break
            }
        }
    
        try {
            await db.push("/users", data)
            console.log('Ranking is up to date')
        } catch (err) {
            console.log(err)
        }
    }
})