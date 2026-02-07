const mqtt = require("mqtt");
const brokerUrl = process.env.MQTT_BROKER_URL || "mqtt://test.mosquitto.org";

const client = mqtt.connect(brokerUrl);

client.on("connect", () => {
  console.log("Połączono z brokerem MQTT");
});

client.on("error", (err) => {
  console.error("Błąd MQTT:", err);
});

module.exports = client;