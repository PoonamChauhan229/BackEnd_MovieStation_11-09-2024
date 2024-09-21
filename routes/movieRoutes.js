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

//  fixation is needed >> auth  >> populate()
router.get('/movie',auth,async(req,res)=>{
    console.log(req.user._id);
    await req.user.populate("movieRel")
    res.send({"movieData":req.user.movieRel})
})
//  fixation is needed

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