const express=require("express")
const adminMiddleware = require("../MiddleWares/admin")
const { Admin, Course } = require("../DB")
const router=express.Router()
const jwt=require("jsonwebtoken")
//const secret=require("../index")
const { JWT_SECRET } = require("../config")

// Admin Routes
router.post("/signup",async function(req,res){
    // create a new admin logic 
    const username=req.body.username
    const password=req.body.password
    // we need to check if user exists with these username or not .
    const isExist=await Admin.findOne({username})
    if(isExist){
        return res.json({
            msg:"Admin with this Username Already Exists."
        })
    }
    // try-catch
    try{

        const newAdmin= await Admin.create({username,password})
    }catch(err){

        return res.json({
            msg:"Sorry Something is Wrong."
        })
    }
    return res.status(500).json({
        msg:"Admin Successfully Created."
    })
})
// will be done when we work on JWT auth
router.post("/signin",async function(req,res){
    // logs in an admin account
    const username=req.body.username
    const password=req.body.password
    const isValid=await Admin.find({
        username,password
    })
    if(isValid){
        const token=jwt.sign({username,password},JWT_SECRET)
        return res.json({token:token})
    }else{
        return res.status(411).json({msg:"Incorrect Username and Password."})
    }

})

router.post("/courses",adminMiddleware,async function(req,res){
    // create a new course

    const title=req.body.title
    const description=req.body.description
    const price=req.body.price
    const imageLink=req.body.imageLink

    const ifExists= await Course.findOne({title})
    if(ifExists){
        return res.json({msg:"This Course Already Exists."})
    }

    try{
        const newCourse=await Course.create({
            title
            ,description
            ,price
            ,imageLink
        })
        console.log(newCourse)

        res.json({msg:"Course Successfully Created",courseId: newCourse._id})

    }catch(err){
        return res.status(500).json({msg:"Something is Wrong"})
    }
})

router.get("/courses",adminMiddleware,async function(req,res){
    // returns all the course   
    try{
        const allCourses=await Course.find({}) 
        return res.json({allCourses})
    }catch(err){
        return res.json({msg:"Somehting went wrong."})
    }
})

module.exports=router