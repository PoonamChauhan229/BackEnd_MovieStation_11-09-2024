const express=require('express')
const app=express()
const dotenv=require('dotenv')
const connection=require('./db/connection')
const movieRouter=require('./routes/movieRoutes')
const userRouter=require('./routes/userRoutes')
const cors=require('cors')


app.use(cors())
dotenv.config()
connection()
// CREATE  a route for home Page

app.use(express.json())
app.get('/',(req,res)=>{
    res.send("Welcome to MovieStation")
})
app.use(movieRouter)
app.use(userRouter)
//server Start:
const PORT=8000
app.listen(PORT,()=>{
    console.log("Server Started at PORT",PORT)
})