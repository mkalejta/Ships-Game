const db = require('./db.js');
const mqttClient = require('./mqttConfig.js');
const Topic = "ranking";

mqttClient.subscribe(Topic, () => {
    console.log('Zasubskrybowano ranking')
})

mqttClient.on("message", async (topic, message) => {
    let data = await db.getData("/ranking")
    const winner = message.toString()

    if (topic === Topic) {
            
        if(!data.includes(winner)) {
            data.push({[winner]: 0})
        }
    
        for (let i = 0; i < data.length; i++) {
            if(Object.keys(data[i])[0] === winner) {
                data[i][winner] += 100
                break
            }
        }
    
        try {
            await db.push("/ranking", data)
            console.log('Ranking is up to date')
        } catch (err) {
            console.log(err)
        }
    }
})