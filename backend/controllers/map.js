var con = require('../config/dbconnections');

const ranges = {
  Normal: { min: 0, max: 5 },
  Low: { min: 6, max: 10 },
  Medium: { min: 11, max: 15 },
  High: { min: 16, max: 20 },
  Extreme: { min: 21, max: 50 }

};


function getAllLvl(sql, [min,max] ,res){
    con.query(sql, [min, max], (err, results) => {
      if (err) {
        console.error('error running query:', err);
        return res.status(500).json({ error: err });
      }
      return res.json(results);
    });
  }


const GetAllDetails = (req, res) => {
    const {level} = req.params;
    const { min, max } = ranges[level];
    
    const sql = `SELECT latest.DEVICE_ID, latest.CAP_DATETIME, latest.DIST_M, settings.lat, settings.lng, settings.LOCATION FROM latest INNER JOIN settings ON latest.DEVICE_ID = settings.DEVICE_NAME COLLATE utf8mb4_general_ci WHERE DIST_M BETWEEN ? AND ? `;
    getAllLvl(sql, [min, max], res);

};

const GetPosition = (req, res) => {
    const {level} = req.params;
  const { min, max } = ranges[level];
  const sql =`SELECT settings.lat, settings.lng FROM latest INNER JOIN settings ON latest.DEVICE_ID= settings.DEVICE_NAME COLLATE utf8mb4_general_ci WHERE DIST_M BETWEEN ? AND ?`;
  getAllLvl(sql, [min, max], res);
}

const GetHistory = (req, res) => {
  const {deviceId} = req.params;
  const sql = 'SELECT CaptureID, CAP_DATETIME, DIST_M , status FROM logs WHERE DEVICE_ID = ?;'
  con.query(sql, deviceId, (err, results) => {
    if (err) {
      console.error('error running query:', err);
      return res.status(500).json({ error: err });
    }
    return res.json(results);
  });
}


module.exports= {GetAllDetails, GetPosition, GetHistory}