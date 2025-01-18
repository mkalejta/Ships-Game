const mqtt = require("mqtt");
const brokerUrl = "mqtt://test.mosquitto.org"; // Publiczny broker MQTT

const client = mqtt.connect(brokerUrl);

client.on("connect", () => {
  console.log("Połączono z brokerem MQTT");
});

client.on("error", (err) => {
  console.error("Błąd MQTT:", err);
});

module.exports = client;