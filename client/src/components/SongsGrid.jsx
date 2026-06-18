import React, { useContext, useState } from 'react'
import { UserContext } from '../contexts/UserContext'
import axios from 'axios'
import { getUserColor } from '../utils/userColor'


const SongsGrid = () => {
    const {user,songs,makesong,likeSong,deletesong,loading}=useContext(UserContext)
    const [search, setSearch] = useState('') 

    const filteredSongs = songs.filter(song =>
        song.songName.toLowerCase().includes(search.toLowerCase()) ||
        song.artist.toLowerCase().includes(search.toLowerCase())
    )
    const topSong = songs.length > 0 
        ? songs.reduce((max, song) => song.likes > max.likes ? song : max, songs[0])
        : null

    if (loading) {
    return (
        <div className='min-w-4xl h-fit p-5 max-sm:min-w-xs'>
        <span className='block text-sm font-lighter text-neutral-400 mb-6'>THE QUEUE•</span>
        <div className='grid justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {[...Array(8)].map((_, i) => (
            <div key={i} className='w-50 h-50 max-sm:w-84 max-sm:h-84 rounded-lg bg-neutral-800 overflow-hidden relative'>
                <div className='absolute inset-0 -translate-x-full animate-shimmer
                bg-linear-to-r from-transparent via-white/5 to-transparent'/>
            </div>
            ))}
        </div>
        </div>
    )
    }
  return (
    
    <div className='min-w-4xl h-fit p-5
    max-sm:min-w-xs'>
    <span className='block text-sm font-lighter text-neutral-400 mb-6'> THE QUEUE• </span>

    {songs.length > 0 && (
    <input
        type='text'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder='search songs or artists...'
        className='mb-6 w-full max-w-sm bg-neutral-800/40 border border-amber-50/20
        rounded-lg px-4 py-2 text-sm text-amber-50 placeholder:text-neutral-500
        focus:outline-none focus:border-purple-500 transition-colors duration-150'
    />
    )}
    {!songs || songs.length ===0 ?(
        <div className='flex flex-col items-center justify-center h-full gap-3 text-neutral-500'>
            <span className='text-6xl'>🎵</span>
            <span className='text-lg'>queue is empty</span>
            <span className='text-sm'>drop the first track above</span>
        </div>
    ):(
        <>
        {filteredSongs.length === 0 && search && (
        <div className='flex flex-col items-center justify-center h-full gap-3 text-neutral-500 mt-10'>
            <span className='text-4xl'>🔍</span>
            <span className='text-lg'>no songs found</span>
            <span className='text-sm'>try a different name</span>
        </div>
        )}
        <div className='grid justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {filteredSongs.map(song=>
                <div key={song._id} className={`w-50 h-50 relative group bg-neutral-900 sm:max-w-50 rounded-lg overflow-hidden
                max-sm:w-84 max-sm:h-84
                ${topSong && song._id === topSong._id && song.likes > 0
                    ? 'ring-2 ring-yellow-400/80 hover:ring-yellow-400 shadow-lg hover:shadow-2xl shadow-yellow-400/30' 
                    : ''}`}>
                    <img src={song.cover} alt={song.songName}
                    className='object-cover max-sm:w-full max-sm:h-64 w-full h-50 transform group-hover:scale-105 transition-transform duration-300'></img>
                    {topSong && song._id === topSong._id && song.likes > 0 && (
                    <span className='absolute top-2 left-1/2 -translate-x-1/2 z-10 border border-yellow-400
                    bg-yellow-400/60 text-black text-xs font-semibold px-2 py-0.5 rounded-full
                    opacity-0 group-hover:opacity-100 max-sm:opacity-100 transition-opacity duration-300'>
                        🔥 trending
                    </span>
                    )}
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/50 transition-colors duration-300" />
                    <span style={{ color: getUserColor(song.addedBy) }}
                    className="absolute top-2 left-2 bg-black/60 text-xs px-2 py-1 rounded-full opacity-0 
                    group-hover:opacity-100 max-sm:opacity-100 transition-opacity duration-300">
                    {song.addedBy}
                    </span>
                    <button onClick={()=>{likeSong(song._id)}}
                    className={` absolute top-2 right-2 bg-black/60 text-md px-1.5 py-0.5 border
                    border-purple-400 hover:text-purple-400 ${song.likedBy.includes(user)?"text-red-500":"text-amber-50"} rounded-full opacity-0 max-sm:opacity-100 group-hover:opacity-100 
                    transition-opacity  duration-300 cursor-pointer`}>
                        ❤︎
                    </button>
                    <button onClick={()=>{deletesong(song._id)}}
                    className='absolute top-10 right-2 bg-black/60 text-md px-1.5 py-0.5 border
                    border-purple-400 hover:text-red-500 hover:border-red-500 rounded-full opacity-0 max-sm:opacity-100 group-hover:opacity-100 
                    transition-opacity  duration-300 cursor-pointer'>
                        ⛌
                    </button>
                    <span className="text-amber-50 leading-none truncate block absolute bottom-14 left-2 text-sm px-2 py-1 rounded-full opacity-0 
                    group-hover:opacity-100 max-sm:opacity-100 transition-opacity duration-300 font-semibold">
                        {song.songName}
                    </span>
                    <span className="text-amber-50/70 truncate block absolute bottom-10 left-2 text-xs px-2 py-1 rounded-full opacity-0 
                    group-hover:opacity-100 max-sm:opacity-100 transition-opacity duration-300 font-lighter">
                        {song.artist}
                    </span>
                    <a className='absolute bottom-2 left-3 text-green-500 opacity-0 max-sm:opacity-100 group-hover:opacity-100 transition-opacity
                    duration-300 font-lighter text-xs rounded-lg bg-green-500/40 p-1 px-3 border border-green-500/60
                    cursor-pointer hover:opacity-70'
                    href={song.spotifyLink} target='_blank'>Spotify</a>
                    <a className='absolute bottom-2 left-20 text-red-500 opacity-0 max-sm:opacity-100 group-hover:opacity-100 transition-opacity
                    duration-300 font-lighter text-xs rounded-lg bg-red-500/40 p-1 px-3 border border-red-500/60
                    cursor-pointer hover:opacity-70'
                    href={song.appleMusicLink} target='_blank'>Apple</a>
                    <a className='absolute bottom-2 left-36 text-orange-500 opacity-0 max-sm:opacity-100 group-hover:opacity-100 transition-opacity
                    duration-300 font-lighter text-xs rounded-lg bg-orange-500/40 p-1 px-3 border border-orange-500/60
                    cursor-pointer hover:opacity-70'
                    href={song.youtubeLink} target='_blank'>YT</a>
                </div>
            )}
        </div>
   </> )}
    </div>
  )
}

export default SongsGrid
