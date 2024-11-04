const con = require('../config/dbconnections');

const SetDevices = (req, res) => {
    const { deviceName, location, latitude, longitude, currentstatus } = req.body;

    const sqlInsert = 'INSERT INTO settings (DEVICE_NAME, LOCATION, lat, lng, status) VALUES (?, ?, ?, ?,?) ON DUPLICATE KEY UPDATE LOCATION=?, lat=?, lng=?, status=?';
    con.query(sqlInsert, [deviceName, location, latitude, longitude, currentstatus, location, latitude, longitude, currentstatus], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err });
        }
        return res.json(results);
    });
}



const InitLevel= (devname)=>{
    const curr_date = new Date().toISOString().replace('T', ' ').replace(/\..+/, '');
    const sql= 'INSERT into latest (DEVICE_ID, CAP_DATETIME, DIST_M) VALUES (?, ?, ?) WHERE EXISTS (SELECT 1 FROM settings WHERE DEVICE_NAME = ?);'
    con.query(sql,[devname, curr_date, 0, devname], (err) => {
        if (err) {
            console.error(err);
        }
        console.log("Added New Latest");
    });
} 

module.exports = {SetDevices} ;