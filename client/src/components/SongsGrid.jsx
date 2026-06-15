import React, { useContext, useState } from 'react'
import { UserContext } from '../contexts/UserContext'
import axios from 'axios'


const SongsGrid = () => {
    const {user,songs,makesong,likeSong,deletesong}=useContext(UserContext)
    const removeSong = (id) => {
        makesong((prev) => prev.filter((song) => song.id !== id));
    }
  return (
    <div className='min-w-4xl h-fit p-5
    max-sm:min-w-xs'>
    <span className='block text-sm font-lighter text-neutral-400 mb-6'> THE QUEUE• </span>
    {!songs || songs.length ===0 ?(
        <div className='flex flex-col items-center justify-center h-full gap-3 text-neutral-500'>
            <span className='text-6xl'>🎵</span>
            <span className='text-lg'>queue is empty</span>
            <span className='text-sm'>drop the first track above</span>
        </div>
    ):(
        <div className='grid justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {songs.map(song=>
                <div key={song._id} className='w-50 h-50 relative group bg-neutral-900 sm:max-w-50 rounded-lg overflow-hidden
                max-sm:w-64 max-sm:h-64'>
                    <img src={song.cover} alt={song.songName}
                    className='object-cover max-sm:w-full max-sm:h-64 w-full h-50 transform group-hover:scale-105 transition-transform duration-300'></img>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/50 transition-colors duration-300" />
                    <span className="text-purple-400 absolute top-2 left-2 bg-black/60 text-xs px-2 py-1 rounded-full opacity-0 
                    group-hover:opacity-100 transition-opacity duration-300">
                        {song.addedBy}
                    </span>
                    <button onClick={()=>{likeSong(song._id)}}
                    className={` absolute top-2 right-2 bg-black/60 text-md px-1.5 py-0.5 border
                    border-purple-400 hover:text-purple-400 ${song.likedBy.includes(user)?"text-red-500":"text-amber-50"} rounded-full opacity-0 group-hover:opacity-100 
                    transition-opacity  duration-300 cursor-pointer`}>
                        ❤︎
                    </button>
                    <button onClick={()=>{deletesong(song._id)}}
                    className='absolute top-10 right-2 bg-black/60 text-md px-1.5 py-0.5 border
                    border-purple-400 hover:text-red-500 hover:border-red-500 rounded-full opacity-0 group-hover:opacity-100 
                    transition-opacity  duration-300 cursor-pointer'>
                        ⛌
                    </button>
                    <span className="text-amber-50 leading-none truncate block absolute bottom-14 left-2 text-sm px-2 py-1 rounded-full opacity-0 
                    group-hover:opacity-100 transition-opacity duration-300 font-semibold">
                        {song.songName}
                    </span>
                    <span className="text-amber-50/70 truncate block absolute bottom-10 left-2 text-xs px-2 py-1 rounded-full opacity-0 
                    group-hover:opacity-100 transition-opacity duration-300 font-lighter">
                        {song.artist}
                    </span>
                    <a className='absolute bottom-2 left-3 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity
                    duration-300 font-lighter text-xs rounded-lg bg-green-500/40 p-1 px-3 border border-green-500/60
                    cursor-pointer hover:opacity-70'
                    href={song.spotifyLink} target='_blank'>Spotify</a>
                    <a className='absolute bottom-2 left-20 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity
                    duration-300 font-lighter text-xs rounded-lg bg-red-500/40 p-1 px-3 border border-red-500/60
                    cursor-pointer hover:opacity-70'
                    href={song.appleMusicLink} target='_blank'>Apple</a>
                    <a className='absolute bottom-2 left-36 text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity
                    duration-300 font-lighter text-xs rounded-lg bg-orange-500/40 p-1 px-3 border border-orange-500/60
                    cursor-pointer hover:opacity-70'
                    href={song.youtubeLink} target='_blank'>YT</a>
                </div>
            )}
        </div>
    )}
    </div>
  )
}

export default SongsGrid
