const mqtt = require("mqtt");
const brokerUrl = "mqtt://broker.hivemq.com"; // Publiczny broker MQTT

const client = mqtt.connect(brokerUrl);

client.on("connect", () => {
  console.log("Połączono z brokerem MQTT");
});

client.on("error", (err) => {
  console.error("Błąd MQTT:", err);
});

module.exports = client;