const con = require('../config/dbconnections');

const SetDevices = (req, res) => {
    const { deviceName, location, latitude, longitude } = req.body;

    const sqlInsert = 'INSERT IGNORE INTO settings (DEVICE_ID, LOCATION, lat, lng) VALUES (?, ?, ?, ?)';
    con.query(sqlInsert, [deviceName, location, latitude, longitude], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err });
        }
        if (results.affectedRows === 0) {
            const sqlUpdate = 'UPDATE settings SET LOCATION=?, lat=?, lng=? WHERE DEVICE_ID=?';
            con.query(sqlUpdate, [location, latitude, longitude, deviceName], (err, results) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: err });
                }
                console.log("Device details updated successfully");
            });
        }
        return res.json(results);
    });
}

module.exports = {SetDevices} ;