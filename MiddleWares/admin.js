const express=require("express");
const { Admin } = require("../DB");
const jwt=require("jsonwebtoken")
const secret=require("../index")
async function  adminMiddleware(req,res,next){
    const token= req.headers.authorization
    const words=token.split(" ")
    const jwtToken=words[1];
    const decodedvalue=jwt.verify(jwtToken,secret)
    if(decodedvalue.username){
        next();
    }else{
        res.status(403).json({
            msg:"You are not authenticated."
        })
    }

}

module.exports=adminMiddleware