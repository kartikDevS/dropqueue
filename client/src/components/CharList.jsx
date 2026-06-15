import React, { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

const CharList = () => {
    const{topSongs,likeSong,user}=useContext(UserContext)



  return (
    <div className='flex flex-col gap-5 p-5'>
      <span className='text-sm font-light text-amber-50/50 px-5'>FULL CHART</span>
      <div className='w-4xl overflow-x-hidden max-sm:w-sm'>
        {topSongs.map((song,index)=>(
            <div key={song._id} className='w-full cursor-pointer hover:border hover:bg-amber-50/10 border-amber-50/30 h-20 rounded-lg flex justify-between p-1 max-sm:p-4 items-center'>
            <div className='flex gap-6 p-2 items-center'>
                <span className='text-xl font-semibold text-purple-400'>{index+1}</span>
                <div className='flex gap-2 items-center'>
                    <div className='flex gap-4 items-center'>
                        <img src={song.cover}
                        alt='song-cover'
                        className='w-14 rounded-lg'>
                        </img>
                        <div className='flex flex-col justify-center '>
                            <span className='text-lg text-amber-50 leading-none max-sm:text-sm'>{song.songName}</span>
                            <span className='text-sm font-lighter text-amber-50/50'>{song.artist}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex items-center gap-2'>
                <span className='text-sm font-lighter text-amber-50/50'>
                    {song.addedBy}
                </span>
                <button onClick={()=>likeSong(song._id)}
                 className={`py-2 cursor-pointer px-3 hover:bg-amber-50/10 text-sm rounded border border-amber-50/50 ${song.likedBy.includes(user)?"text-red-500":"text-amber-50"}`}>❤︎ {song.likes}</button>
            </div>
        </div>))}
      </div>
    </div>
  )
}

export default CharList
