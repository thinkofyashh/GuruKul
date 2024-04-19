const express=require("express")
const { User } = require("../DB")
const jwt =require("jsonwebtoken")
const secret=require("../index")

async function userMiddleWare(req,res,next){
    const token=req.headers.authorization
    const words=token.split(" ")
    const jwtToken=words[1]
    const decodedvalue=jwt.verify(jwtToken,secret)
    if(decodedvalue.username){
        next();
    }else{
        return res.status(403).json({msg:"You are not authenticated."})
    }

}

module.exports=userMiddleWare