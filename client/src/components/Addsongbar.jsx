import React, { useContext, useRef } from 'react'
import { UserContext } from '../contexts/UserContext'
import axios from 'axios'
import api from '../api/api'

const Addsongbar = () => {
    const inputRef=useRef(null)
    const {makesong,makeerror,user,deviceId}=useContext(UserContext)

    function spUrl(t, a) {
    return `https://open.spotify.com/search/${encodeURIComponent(t + " " + a)}`;
    }

    function apUrl(t, a) {
    return `https://music.apple.com/search?term=${encodeURIComponent(t + " " + a)}`;
    }

    function ytUrl(t, a) {
    return `https://www.youtube.com/results?search_query=${encodeURIComponent(t + " " + a)}`;
    }

    const handleAdd=async()=>{
        try{
            const resp = await axios.get(`https://itunes.apple.com/search?term=${encodeURIComponent(inputRef.current.value)}&entity=song&limit=1`)
            const song= resp.data.results[0]

            const songObj = {
                songid: song.trackId,
                addedBy: user,
                likes: 0,
                likedBy:[],
                artist: song.artistName,
                songName: song.trackName,
                preview: song.previewUrl,
                appleMusicLink: apUrl(song.trackName, song.artistName),
                spotifyLink: spUrl(song.trackName, song.artistName),
                youtubeLink: ytUrl(song.trackName, song.artistName),
                cover: song.artworkUrl100.replace("100x100", "600x600"),
            }
            const apiUrl = import.meta.env.VITE_API_URL
            const res = await api.post('/song',{...songObj,deviceId})
            inputRef.current.value=''
        } catch(err){
            const message = err.response?.data?.error || "Song could not be added"
            console.log(err)
            makeerror(message)
            }
        }
  return (
    <div className='flex flex-col gap-2 py-10 px-1 border-b border-amber-50/20
    max-sm:max-w-xs'>
        <div>
            <span className='text-neutral-400/50 text-sm font-stretch-50% font-lighter'>DROP A TRACK</span>
        </div>
        <div className='flex gap-2 items-center'>
            <input onKeyDown={(e)=>{e.key==='Enter' && handleAdd()}}
             ref={inputRef} className='border placeholder:text-neutral-400/50 border-amber-50/20 bg-neutral-800/40 max-sm:text-xs max-sm:px-3 w-3xl rounded-lg p-3 focus:outline-none focus:border-purple-500 transition-colors duration-150'
            type='text' placeholder='song - artist (e.g. Starboy - The Weekend)'></input>
            <button onClick={handleAdd}
            className='py-3 max-sm:py-1 hover:bg-purple-600 transition-colors duration-150 cursor-pointer px-4 max-sm:px-2 rounded-lg bg-purple-600/80 font-semibold text-lg max-sm:text-xs'>+drop it</button>
        </div>
    </div>
  )
}

export default Addsongbar
