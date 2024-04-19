const express=require("express")
const { User } = require("../DB")
const jwt =require("jsonwebtoken")
const { JWT_SECRET } = require("../config")
//const secret=require("../index")

async function userMiddleWare(req,res,next){
    const token=req.headers.authorization
    const words=token.split(" ")
    const jwtToken=words[1]
    const decodedvalue=jwt.verify(jwtToken,JWT_SECRET)
    if(decodedvalue.username){
        req.username=decodedvalue.username
        next();
    }else{
        return res.status(403).json({msg:"You are not authenticated."})
    }

}

module.exports=userMiddleWare