const express=require('express')
const Song = require('../models/Song')   
const router=express.Router()

const verifyToken = require('../middleware/auth')

router.get('/', async(req,res)=>{
    try{
        const songs= await Song.find()
        res.json(songs)
    } catch (err){
        console.error(err)
        res.status(500).json({ error: 'Failed to fetch songs' })
    }
})

router.get('/top10', async(req,res)=>{
    try{
        const data= await Song.find().sort({likes: -1}).limit(10)
        res.json(data)
    } catch (err) {
        console.error(err)
        res.status(500).json({error: "Failed to fetch top charts" })
    }
})


router.post('/',verifyToken,async(req,res)=>{
    try{
        const count= await Song.countDocuments({addedBy: req.userId})
        if(count>=10)return res.status(400).json({error: "You have reached the limit of 10 songs"})

        const existing= await Song.findOne({songid: req.body.songid})
        if(existing)return res.status(400).json({error: "Song already added"})

        const newSong = new Song({...req.body,addedBy: req.username})
        await newSong.save()
        res.status(201).json(newSong)

    } catch (err){
        if (err.code === 11000) { 
            return res.status(400).json({ error: "Song already added" })
        }
        console.error(err)
        res.status(500).json({error: "Song could not be added"})
    }
})

router.put('/:id/like',verifyToken,async(req,res)=>{
    const user =req.username
    const song=await Song.findById(req.params.id)
    if(!song) return res.status(404).json({error: 'Song not found'})

    const isLiked= song.likedBy.includes(user)
    if(isLiked){
        song.likes = Math.max(0, song.likes - 1)
        song.likedBy=song.likedBy.filter(u=>u!==user)
    }
    else{
        song.likes+=1
        song.likedBy.push(user)
    }
    await song.save()
    res.json(song)
})

router.delete('/:id',verifyToken, async(req,res)=>{
    try{
        const song= await Song.findById(req.params.id)
        if(!song)return res.status(404).json({error: 'song not found'})

        if(song.addedBy!==req.userId){
            return res.status(403).json({ error: 'You can only delete your own songs' })
        }

        await song.deleteOne()
        res.json({message: 'song deleted successfully'})

    } catch (err){
        console.error(err)
        res.status(500).json({error: "Failed to delete song"})
    }
})

module.exports= router
