// npm install mongoose
const mongoose=require("mongoose");
const { number } = require("zod");

// connecting my mongoDb with project
mongoose.connect("mongodb+srv://thinkofyash:18NovMonday@cluster0.xay1cqj.mongodb.net/");


// define Schemas 

const UserSchema=new mongoose.Schema({
    email:String,
    password:String,
})

const AdminSchema=new mongoose.Schema({
    email:String,
    password:String

})

const CourseSchema=new mongoose.Schema({
    title:String,
    description:String,
    price:number,
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