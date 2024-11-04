const express = require('express');
const app = express();
const path = require('path');
const { exec } = require('child_process');
var db = require('./config/dbconnections');
const corsOptions = require('./config/corseOption');
const cors = require('cors');
const bcrypt = require('bcrypt');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const { logger } = require('./middleware/logEvents');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const {GetWaterLevel} =require('./controllers/mqtt');

const updateProfileRouter = require('./routes/authUpdate');
const mapRouter = require('./routes/mapRoutes'); // Import the MapRoute module
const evacRouter= require('./routes/evacuationRoutes');
const userRouter = require('./routes/userRoutes');
const setdeviceRouter = require('./routes/setdeviceRoutes');

// Middleware setup
app.use(logger);
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());




app.use(express.static(path.join(__dirname, 'public')));

exec('stream.bat', (err, stdout, stderr) => {
    if (err) {
        console.error(`Error starting stream: ${err.message}`);
        return;
    }
    console.log(`Stream started: ${stdout}`);
    if (stderr) {
        console.error(`Stream stderr: ${stderr}`);
    }
});


app.get('/Camera1/stream.m3u8', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Camera1', 'stream.m3u8'));
});

exec('stream2.bat', (err, stdout, stderr) => {
    if (err) {
        console.error(`Error starting stream: ${err.message}`);
        return;
    }
    console.log(`Stream started: ${stdout}`);
    if (stderr) {
        console.error(`Stream stderr: ${stderr}`);
    }
});



app.get('/Camera2/stream2.m3u8', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Camera2', 'stream2.m3u8'));
});





app.use('/refresh', require('./routes/refresh'));
app.use(setdeviceRouter);
app.use(userRouter);
app.use('/reset', require('./routes/authRes'));

app.use('/insertLgu', require('./routes/authInsertLgu'));
app.use('/insertElect', require('./routes/authInsertElect'));
app.use('/showLgu', require('./routes/authshowLgu'));
app.use('/lgu-date', require('./routes/authLguDate'));
app.use('/getelectedofficial', require('./routes/authElectedOfficial'));

app.use('/adminIn', require('./routes/authAdmin'));
app.use('/passChange', require('./routes/authChangePass'));


app.use('/insertBrgy', require('./routes/autInsertbrgy'));
app.use('/getBrgy', require('./routes/authshowBrgy'));
app.use('/insertBarangay', require('./routes/autInsertOfficial'));
app.use('/brgy-names', require('./routes/authBrgyNames'));
app.use('/brgy-date', require('./routes/authDateOfficial'));
app.use('/getbrgyOfficial', require('./routes/authshowbrgyOfficial'));


app.use('/insertPurok', require('./routes/authInsertPurok'));
app.use('/show-purok', require('./routes/authPurokname'));
app.use('/purok-info', require('./routes/authPurokInfo'));
app.use('/auth', require('./routes/auth'));

app.use(mapRouter);
app.use(evacRouter);


app.use('/logout', require('./routes/logout'));

app.use('/api', updateProfileRouter); // Mount the router
app.use('/ProfilePage', require('./routes/api/authProf'));

// Verify JWT middleware
app.use(verifyJWT);
app.use('/employees', require('./routes/api/employees'));
app.use('/users', require('./routes/api/users'));


app.use('/api/protected-route', verifyJWT, (req, res) => {
    res.json({ message: "You have access to this protected route", user: req.user, roles: req.roles });
});

// Handle 404 errors
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler);

// Automatically run the stream.bat script when the server starts


GetWaterLevel();


// Start the server
app.listen(7000, () => {
    console.log("Listening...");
});
