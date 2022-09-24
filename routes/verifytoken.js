const JWT = require('jsonwebtoken');

module.exports = function (req,res,next){
    // const token = req.header('auth-token');
    
    const token = req.cookies.jwt
    if(!token) return res.status(401).send('Access Denied  Login to gain access');

    try {
        const verified = JWT.verify(token,'secretCode');
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send("Login to access")
    }
}

