const mongoose=require('mongoose')

const songSchema= new mongoose.Schema({
        songid: { type: Number, unique: true }, 
        addedBy: { type: String, required: true },
        likes: Number,
        likedBy:[String],
        artist: String,
        songName:String,
        preview: String,
        appleMusicLink: String,
        spotifyLink: String,
        youtubeLink: String,
        cover: String,
    })

module.exports= mongoose.model('Song',songSchema)