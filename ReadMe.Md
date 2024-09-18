Installations:
npm init -y

npm i express mongoose cors dotenv jsonwebtoken nodemon bcryptjs nodemailer multer sharp

OR

npm install express mongoose cors dotenv jsonwebtoken nodemon bcryptjs nodemailer multer sharp
_____________
Files
.gitignore
index.js
.env

Folders 
db          >> connection.js
model       >> userModel.js ++++++++
routes      >> userRoutes.js+++++++++
middleware  >> auth.js
________________

Update the Scripts in package.json 
_____________________

Functionality
>> User 


Fumika 
URL:https://github.com/Fumika0523/BackEnd_MovieStation_11-09-2024

Poonam
URL:https://github.com/PoonamChauhan229/BackEnd_MovieStation_11-09-2024


Starting with the Backend Project:

>Start the server
>index.js

const express=require('express')
const app=express()

// CREATE  a route for home Page
app.get('/',(req,res)=>{
    res.send("Welcome to MovieStation")
})
//server Start:
const PORT=8000
app.listen(PORT,()=>{
    console.log("Server Started at PORT",PORT)
})
______________________________________________

>Connection with Database
>.env           >> storing critical information which we dont want to expose
>connection.js  >> mongodb connection
>index.js       >> import dotenv and connection.js

_______________________________________________
Creating a Model
userModel   >>
movieModel  >> 


Public 
Home
About
Service
Contact >Model
SignIn  >Model -userModel
SignUp  >Model -userModel

Private
AllMovies  >Model movieModel GET
AddMovie   >Model movieModel POST
Edit       >Model movieModel PATCH/PUT
Delete     >Model movieModel DELETE
Cart       >Model orderModel

DB : .env file
models:

connection() index.js