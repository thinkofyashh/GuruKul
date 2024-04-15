const express=require("express")
const router=express.Router()

// users routes

router.post("/signup",function(req,res){
    // creates a new user account
})

router.post("/signin",function(req,res){
    //logs in a user account
})
router.get("/courses",function(req,res){
    // get courses
})
router.post("courses/:courseId",function(req,res){
    // buy courses
})
router.get("purchasedCourses",function(req,res){
    // get purchased course list
})

module.exports=router;