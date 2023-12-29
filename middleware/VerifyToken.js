var  express = require('express');
var jwt = require("jsonwebtoken");
const secretkey = "secret key";

// middleware for login token check
const VerifyToken = async (req, res, next) =>{
    try {
        
        var BearerToken = req.headers['authorization'];
        if(BearerToken == undefined || BearerToken == "") res.status(401).send({ "status" : false, "message":"Token not present." });
        
        var token = BearerToken.split(" ")[1];
        // console.log("token", token);

        // verify token
        jwt.verify(token,secretkey, async (err, auth)=>{
            if (auth?.resData?.type != 'admin') return  res.status(401).send({ "status": false, "message": "Invalid authorization" });
            var userId = auth?.resData?._id;

            if(err || userId == undefined) res.status(401).send({ "status" : false, "message":err });

            if(userId == undefined || userId == "") res.status(401).send({ "status" : false, "message":"Token invalid" });

            auth.resData.token = token;
            req.auth = auth;
            next();     // if token present move to next.
        });
    
    } catch (error) {
        res.status(401).send({ "status" : false, "message":"Catch: Token access time expired, Please login again." });    
    }
    
}

module.exports = VerifyToken;