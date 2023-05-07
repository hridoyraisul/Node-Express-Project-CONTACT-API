const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const {decode} = require("jsonwebtoken");


const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer')){
        token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
            if (err){
                res.status(401);
                throw new Error('Requested user is not authorized!');
            }
            req.user = decodedToken.user_info;
            next();
        })
    }

    if (!token){
        res.status(401);
        throw new Error('Requested user is not authorized or token is invalid');
    }
});

module.exports = validateToken;