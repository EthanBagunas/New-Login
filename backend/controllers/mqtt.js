const mqtt = require('mqtt');
const db= require('../config/dbconnections');
var options = {
username: process.env.HIVE_USERNAME,
password: process.env.HIVE_PASSWORD,
rejectUnauthorized: true
}
const url = `tls://${process.env.HIVE_CLUSTER_URL}:8883`;
const client = mqtt.connect(url, options);

function GetWaterLevel() {
    client.on('connect', () => {
      console.log('MQTT connection established');
      client.subscribe('#', (err) => {
        if (err) {
          console.error('Error subscribing to topic:', err);
        } else {
          console.log('Subscribed');
        }
      });
    });
}

client.on('message',(topic, message) => {
    console.log(`Received message on topic:${topic}: message: ${message}`);
    Insert2Latest(message)

});
    
client.on('disconnect', () => {
    console.log('Disconnected from MQTT server');
});

client.on('error', (err) => {
console.error('MQTT connection error:', err);
});

module.exports= {GetWaterLevel};



function Insert2Latest(message) {
    const [devid, waterlvl] = message.toString().split(',');

    const currentDateTime = new Date().toISOString().replace('T', ' ').replace(/\..+/, '');
    console.log('CurrentTime:', currentDateTime); // Output: 2023-01-03 12:36:25
    console.log('Device_ID:', devid);
    console.log('Water Level:', waterlvl);

    const sql = `
    START TRANSACTION;
    IF EXISTS (SELECT 1 FROM latest WHERE DEVICE_ID = ?) THEN
        INSERT INTO logs (DEVICE_ID, CAP_DATETIME, DIST_M)
        SELECT DEVICE_ID, CAP_DATETIME, DIST_M
        FROM latest
        WHERE DEVICE_ID = ?;
        DELETE FROM latest WHERE DEVICE_ID = ?;
    END IF;

    INSERT INTO latest (DEVICE_ID, CAP_DATETIME, DIST_M)
    VALUES (?, ?, ?);

    COMMIT;
    `;

    db.query(sql, [devid, devid, devid, devid, currentDateTime, waterlvl], (error, result) => {
        if (error) {
            console.error('Error inserting data into latest:', error);
            return; // Don't throw error here, continue to commit the transaction
        }
        console.log(result);
        // Send success response
      });
}