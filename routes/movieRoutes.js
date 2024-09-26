const express=require('express')
const Movie = require('../model/movieModel')
const auth=require('../middleware/auth')
const router=express.Router()

router.post('/addmovie',auth,async(req,res)=>{
    try{
        console.log(req.headers)
        const movieData = new Movie({
            ...req.body, //making the copy of req.body
            owner:req.user._id // this one I need to update
        })
        if(!movieData){res.status(401).send({message:"Movie cannot be added"})}
        await movieData.save()
        res.status(200).send({movieData:movieData,message:"Movie has been added successfully"})
         }
        catch(e){
            res.status(500).send({message:"Some internal Error"})
        }
})


router.get('/movie',auth,async(req,res)=>{
    try{
        console.log(req.user._id);
        if(req.user){
            let getMovie=await req.user.populate("movieRel")
            console.log("test",getMovie) // res
            if(getMovie){
                res.send({"movieData":req.user.movieRel})
            }else{
                res.send({"message":"Movie not added"})
            }
        }else{
            res.send({"message":"User Not Found,Sigin In Failed"})
        }
        
    }catch(e){
        res.send({"message":"Some Internal Error"})
    }
    
})

// New Route Which you the movie by id using auth /editmovie/:id

router.get('/movie/:id',auth,async(req,res)=>{
    try{
        if(req.user){         
            const getMovie= await req.user.populate("movieRel") // using the virtual feild
            if(getMovie){
                const allMovies=req.user.movieRel
                let movieById=allMovies.filter((element,index)=>{
                    return element._id==req.params.id
                })
                if(movieById.length!=0){
                    res.send(movieById)
                }
                else{
                    res.send({"message":"Movie Not Found, Enter the correct Id"})
                }                 
            }
        }else{
            res.send("User Authentication Failed")
        }
        }catch(e){
            res.send({"message":"Some Internal Error"})
        }
})

router.put('/updatemovie/:id',auth,async(req,res)=>{
    const updateMovie = await Movie.findOneAndUpdate({_id:req.params.id,owner:req.user._id},req.body,{new:true, runValidators:true})
    try{
        console.log(updateMovie)
        if(!updateMovie){
        return res.send({message:"Can't update the Movie, please check again"})
         }
         res.send         ({message:"The Movie has been successfully updated",updateMovie})
    }catch(e){
        res.send({message:"Some Internal Error Occur"})
    }
})

router.delete('/deletemovie/:id',auth,async(req,res)=>{
    try{
        console.log("Delete Movie by ID",req.params.id)
        const deleteMovie = await Movie.findOneAndDelete({
            _id:req.params.id,owner:req.user._id
        })
        if(!deleteMovie){
            res.send({message:"Movie Not Found"})
        }
        res.send({message:"Movie has been deleted successfully",deleteMovie})
        }catch(e){
            res.send({message:"Some Internal Error"})
        }
})

module.exports=router