const express=require('express')
const app=express()
const dotenv=require('dotenv')
dotenv.config()
const connection=require('./db/connection')
connection()
// CREATE  a route for home Page

app.get('/',(req,res)=>{
    res.send("Welcome to MovieStation")
})
//server Start:
const PORT=8000
app.listen(PORT,()=>{
    console.log("Server Started at PORT",PORT)
})