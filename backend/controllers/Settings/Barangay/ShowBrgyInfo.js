const db = require('../../../config/dbconnections');

const ShowBrgy = (req, res) => {
    const { name } = req.params;
    const query = 'SELECT * FROM brgy_setup WHERE brgyName = ?';
    
    db.query(query, [name], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error fetching barangay data' });
      }
      
      if (results.length > 0) {
        const barangayData = results[0];

      

        // Convert Logo_1 to Base64
        if (barangayData.Logo_1) {
          const base64Image1 = barangayData.Logo_1.toString('base64');
          barangayData.Logo1 = `data:image/jpeg;base64,${base64Image1}`;
        }

        // Convert Logo_2 to Base64
        if (barangayData.Logo_2) {
          const base64Image2 = barangayData.Logo_2.toString('base64');
          barangayData.Logo2 = `data:image/jpeg;base64,${base64Image2}`;
        }

        res.json(barangayData);
      } else {
        res.status(404).json({ message: 'Barangay not found' });
      }
    });
  };
  
  module.exports = { ShowBrgy };
  