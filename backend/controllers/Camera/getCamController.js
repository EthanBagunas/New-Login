var db = require('../../config/dbconnections');

const  getCamera = async(req,res)=> {
    const folder = req.params.folder;
    try {
        const [camera] = await db.query('SELECT * FROM settings WHERE folder_name = ?', [folder]);
        if (camera.length > 0) {
            const streamUrl = `http://localhost:7000/${camera[0].folder_name.toLowerCase()}/stream.m3u8`; 
            res.json({ ...camera[0], streamUrl }); // Include the stream URL
        } else {
            res.status(404).json({ error: 'Camera not found' });
        }
    } catch (error) {
        console.error('Database error:', error); // Add logging for debugging
        res.status(500).json({ error: 'Database error' });
    }
}
module.exports = { getCamera };