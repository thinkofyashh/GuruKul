const express=require("express")
const bodyParser=require("body-parser")
//const JWT_SECRET="yash_server";
const app=express()
const userRouter=require("./Routes/user")
const adminRouter=require("./Routes/admin")
app.use(bodyParser.json())
app.use("/user",userRouter)
app.use("/admin",adminRouter)
const Port=3000
app.listen(Port)
//module.exports=JWT_SECRET