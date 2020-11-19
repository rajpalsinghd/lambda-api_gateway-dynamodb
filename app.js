const express=require('express')
const bodyParser=require('body-parser')
const path=require('path')


const app=express()

app.use(bodyParser.json())



app.get("/",(req,res)=>{
var options = { 
        root: path.join(__dirname) 
    }; 
return res.sendFile("/ui-content/index.html",options);
})

app.get("/getusers",(req,res)=>{
var options = { 
        root: path.join(__dirname) 
    }; 
return res.sendFile("/ui-content/getusers.html",options);
})


app.listen(4000,()=>{console.log("Up and running")})