// npm install mongoose
const mongoose=require("mongoose");
const { number } = require("zod");

// connecting my mongoDb with project
mongoose.connect("mongodb+srv://thinkofyash:18NovMonday@cluster0.xay1cqj.mongodb.net/gurukulDB");


// define Schemas 

const UserSchema=new mongoose.Schema({
    username:String,
    password:String,
    purchasedCourses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }]
})

const AdminSchema=new mongoose.Schema({
    username:String,
    password:String

})

const CourseSchema=new mongoose.Schema({
    title:String,
    description:String,
    price:Number,
    imageLink:String
})


const User=mongoose.model('User',UserSchema)
const Admin=mongoose.model('Admin',AdminSchema)
const Course=mongoose.model('Course',CourseSchema)

module.exports={
    User,
    Admin,
    Course
}