const express=require("express")
const router=express.Router()


// Admin Routes
router.post("/signup",function(req,res){
    // create a new admin logic 
})

router.post("/signin",function(req,res){
    // logs in an admin account
})

router.post("/courses",function(req,res){
    // create a new course
})

router.get("/courses",function(req,res){
    // returns all the course
    res.json({
        msg:"hi there"
    })
})

module.exports=router