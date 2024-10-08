const jwt = require('jsonwebtoken');
const secretKey = '123123123123asdasdkljqwheihasjkdhkdjfhiuhq983e12heijhaskjdkasbd812hyeijahsdkb182h3jaksd';

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : req.cookies.jwt;
    
    if (!token) return res.sendStatus(401);
    
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) return res.sendStatus(403); // Invalid token
        console.log('Decoded Token:', decoded);
        req.id = decoded.id;
        req.user = decoded.email;
        req.roles = decoded.roles; 
        next();
    });
};

module.exports = verifyJWT;
