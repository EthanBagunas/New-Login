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
  const currentDateTime = new Date();
  const utcOffset = 8 * 60; // UTC+8 in minutes
  const localDateTime = new Date(currentDateTime.getTime() + (utcOffset * 60 * 1000));
  const formattedDateTime = localDateTime.toISOString().replace('T', ' ').replace(/..+/, '');

  // Start a transaction

  db.beginTransaction((err) => {
      if (err) {
          console.error('Error starting transaction:', err);
          return;
      }

      // Check if the device ID already exists in the latest table
      const checkSql = `SELECT * FROM latest WHERE DEVICE_ID = ?`;
      db.query(checkSql, [devid], (error, results) => {
          if (error) {
              return db.rollback(() => {
                  console.error('Error checking latest:', error);
              });
          }
          // If there's an existing entry, move it to logs
          if (results.length > 0) {
              const moveToLogsSql = `
                  INSERT INTO logs (DEVICE_ID, CAP_DATETIME, DIST_M)
                  VALUES (?, ?, ?)
              `;
              const oldRecord = results[0];
              db.query(moveToLogsSql, [oldRecord.DEVICE_ID, oldRecord.CAP_DATETIME, oldRecord.DIST_M], (moveError) => {
                  if (moveError) {
                      return db.rollback(() => {
                          console.error('Error moving to logs:', moveError);
                      });
                  }
                  // Now delete the old record from latest
                  const deleteSql = `DELETE FROM latest WHERE DEVICE_ID = ?`;
                  db.query(deleteSql, [devid], (deleteError) => {
                      if (deleteError) {
                          return db.rollback(() => {
                              console.error('Error deleting from latest:', deleteError);
                          });
                      }

                      const insertSql = `
                          INSERT INTO latest (DEVICE_ID, CAP_DATETIME, DIST_M)
                          VALUES (?, ?, ?)
                      `;
                      db.query(insertSql, [devid, formattedDateTime, waterlvl], (insertError) => {
                          if (insertError) {
                              return db.rollback(() => {
                                  console.error('Error inserting into latest:', insertError);
                              });
                          }
                          // Commit the transaction
                          db.commit((commitError) => {
                              if (commitError) {
                                  return db.rollback(() => {
                                      console.error('Error committing transaction:', commitError);
                                  });
                              }
                              console.log('Transaction completed successfully.');
                          });
                      });
                  });
              });
          } else {
              // If no existing entry, just insert the new record
              const insertSql = `
                  INSERT INTO latest (DEVICE_ID, CAP_DATETIME, DIST_M)
                  VALUES (?, ?, ?)
              `;
              db.query(insertSql, [devid, formattedDateTime, waterlvl], (insertError) => {
                  if (insertError) {
                      return db.rollback(() => {
                          console.error('Error inserting into latest:', insertError);
                      });
                  }


                  db.commit((commitError) => {
                      if (commitError) {
                          return db.rollback(() => {
                              console.error('Error committing transaction:', commitError);
                          });
                      }
                      console.log('Transaction completed successfully.');
                  });
              });
          }
      });
  });

}