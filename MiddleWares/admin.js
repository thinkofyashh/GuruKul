const express=require("express");
const { Admin } = require("../DB");

async function  adminMiddleware(req,res,next){
    const username=req.headers.username;
    const password=req.headers.password;
    const isExist=await Admin.findOne({
        username:username,
        password:password
    })
    if(isExist){
        next();
    }
    else{
        res.json({
            msg:"user doesnt Exists"
        })
    }
}

module.exports=adminMiddleware