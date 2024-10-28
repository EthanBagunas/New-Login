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
    
    const sql = `SELECT latest.DEVICE_ID, latest.CAP_DATETIME, latest.DIST_M, settings.lat, settings.lng, settings.LOCATION FROM latest INNER JOIN settings ON latest.DEVICE_ID = settings.DEVICE_ID WHERE DIST_M BETWEEN ? AND ? `;
    getAllLvl(sql, [min, max], res);

};

const getDeviceInfoByName = (req, res) => {
  const {name} = req.params;
  const sql = 'SELECT * FROM settings WHERE settings.DEVICE_NAME = ?';

  con.query(sql, name, (err, results) => {
    if (err) {
      console.error('error running query:', err);
      return res.status(500).json({ error: err });
    }
    return res.json(results);
  });
}
const GetPosition = (req, res) => {
    const {level} = req.params;
  const { min, max } = ranges[level];
  const sql =`SELECT settings.DEVICE_NAME, settings.lat, settings.lng FROM latest INNER JOIN settings ON latest.DEVICE_ID= settings.DEVICE_NAME COLLATE utf8mb4_general_ci WHERE DIST_M BETWEEN ? AND ?`;
  getAllLvl(sql, [min, max], res);
}
const GetEvacPosition = (req, res) => {
  const {list} = req.params;
  let sql
  if (list == 'all') {
    sql='SELECT idEvacuationCenter,Evac_Name, lat, lng, status, current_capacity, max_capacity, LOCATION FROM EvacuationCenter'
  } 
  con.query(sql, (err, results) => {
    if (err) {
      console.error('error running query:', err);
      return res.status(500).json({ error: err });
    }
    return res.json(results);
  });
}

const InsertOccupant= (req, res) => {
  const occupantData = req.body; // Assuming the occupant data is sent in the request body
  // Construct the SQL query without the DEVICE_ID column
  const sql = `
  INSERT INTO Occupants (
    Infants_M, Toddlers_M, Preschoolers_M, SchoolAge_M, Teenage_M, Adult_M, Senior_Citizen_M, 
    Pregnant_women, Lactating_mothers, Solo_Parent, occupant_location
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  ON DUPLICATE KEY UPDATE 
  Infants_M = Infants_M + VALUES(Infants_M), Toddlers_M = Toddlers_M + VALUES(Toddlers_M), 
  Preschoolers_M = Preschoolers_M + VALUES(Preschoolers_M), SchoolAge_M = SchoolAge_M + VALUES(SchoolAge_M), 
  Teenage_M = Teenage_M + VALUES(Teenage_M), Adult_M = Adult_M + VALUES(Adult_M), 
  Senior_Citizen_M = Senior_Citizen_M + VALUES(Senior_Citizen_M), Pregnant_women = Pregnant_women + VALUES(Pregnant_women), 
  Lactating_mothers = Lactating_mothers + VALUES(Lactating_mothers), Solo_Parent = Solo_Parent + VALUES(Solo_Parent)
`;
  // Execute the query using only the occupant data values
  con.query(sql, [occupantData.Infants, occupantData.Toddlers, occupantData.Preschoolers, occupantData.SchoolAge, occupantData.Teenage, occupantData.Adult, occupantData.Senior_Citizen, occupantData.Pregnant_women, occupantData.Lactating_mothers, occupantData.Solo_Parent, occupantData.occupant_location], (err, result) => {
    console.log(result);
    if (err) {
      console.error('error running query:', err);
      return res.status(500).json({ error: err });
    }
    
    return res.status(201).json({ message: `Occupant Id: ${result.insertId}` });
  });
};

const GetHistory = (req, res) => {
  const {deviceId} = req.params;
  const sql = 'SELECT CaptureID, CAP_DATETIME, DIST_M FROM logs WHERE DEVICE_ID = ?;'
  con.query(sql, deviceId, (err, results) => {
    if (err) {
      console.error('error running query:', err);
      return res.status(500).json({ error: err });
    }
    return res.json(results);
  });
}


module.exports= {GetAllDetails, GetPosition, GetHistory, GetEvacPosition, getDeviceInfoByName, InsertOccupant}