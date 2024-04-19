const express=require("express")
const userMiddleWare = require("../MiddleWares/user")
const { User, Course } = require("../DB")
const router=express.Router()
const jwt=require("jsonwebtoken")
const { JWT_SECRET } = require("../config")

// users routes

router.post("/signup",async function(req,res){
    // creates a new user account
    const username =req.body.username
    const password=req.body.password
    
    const exists= await User.findOne({username})
    if(exists){
        return res.json({msg:"User Already Exists."})
    }
    // try-catch
    try{
        const newUser=User.create({username,password})
        return res.json({msg:"User Successfully created."})
    }catch(err){
        return res.status(500).json({msg:"Something Went Wrong"})
    }
})
// we will do these when we apply JWT logic
router.post("/signin",async function(req,res){
    //logs in a user account
    const username=req.body.username
    const password=req.body.password

    const isValid=await User.find({username,password})
    if(isValid){
        const token = jwt.sign({username,password},JWT_SECRET)
        return res.json({token : token})
    }else{
        return res.json({msg:"Incorrect Username or Password"})
    }

})
router.get("/courses",async function(req,res){
    // get courses
   try{
    const allCourses=await Course.find({})
    return res.json({allCourses})
   }catch(err){
    return res.json({msg:"Something Went Wrong"})
   }

})
router.post("/courses/:courseId",userMiddleWare,async function(req,res){
    // buy courses
    const courseId=req.params.courseId
    const username=req.username
   // const username=req.headers.username (this will be no longer allowed since we are only sending the JWT token in the headers)

    try{

       await  User.updateOne({username:username},{
            '$push':{purchasedCourses:courseId}
        })

        return res.json({msg:"SuccessFully Purchased the Course."})

    }catch(err){
        return res.status(500).json({msg:"Something Went Wrong"})
    }
})
router.get("/purchasedCourses",userMiddleWare,async function(req,res){
    // get purchased course list
    const user=await User.findOne({username:req.username})

    console.log(user.purchasedCourses)

    const purchasedCourses=await Course.find({
        _id : {
            "$in":user.purchasedCourses 
        }
    }    
    )
    return res.json({Course:purchasedCourses})
})

module.exports=router;