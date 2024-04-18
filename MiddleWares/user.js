const express=require("express")
const { User } = require("../DB")


async function userMiddleWare(req,res,next){
const username=req.headers.username
const password=req.headers.password
const isExist=await User.findOne({
    username:username,
    password:password
})
if(isExist){
    next()
}
else{
    res.json({
        msg:"User Doesnt Exists"
    })
}
}

module.exports=userMiddleWare