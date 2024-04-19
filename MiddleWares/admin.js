const express=require("express");
const { Admin } = require("../DB");
const jwt=require("jsonwebtoken")
//const secret=require("../index");
const { JWT_SECRET } = require("../config");
async function  adminMiddleware(req,res,next){
    const token= req.headers.authorization
    const words=token.split(" ")
    const jwtToken=words[1];
    try{
        const decodedvalue=jwt.verify(jwtToken,JWT_SECRET)
    if(decodedvalue.username){
        next();
    }else{
        res.status(403).json({
            msg:"You are not authenticated."
        })
    }
    }catch(err){
        return res.status(500).json({msg:"Incorrect Credentials."})
    }

}

module.exports=adminMiddleware