const db = require('../../../config/dbconnections');

const ShowLgu = (req, res) => {
    const query = 'SELECT * FROM lgu_setup';
    
    db.query(query, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error fetching LGU data' });
      }
      
      if (results.length > 0) {
        const LGUData = results[0];

      

        // Convert Logo_1 to Base64
        if (LGUData.Logo_1) {
          const base64Image1 = LGUData.Logo_1.toString('base64');
          LGUData.Logo1 = `data:image/jpeg;base64,${base64Image1}`;
        }

        // Convert Logo_2 to Base64
        if (LGUData.Logo_2) {
          const base64Image2 = LGUData.Logo_2.toString('base64');
          LGUData.Logo2 = `data:image/jpeg;base64,${base64Image2}`;
        }

        res.json(LGUData);
      } else {
        res.status(404).json({ message: 'LGU not found' });
      }
    });
  };
  
  module.exports = { ShowLgu };
  