import React, { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

const Podium = () => {
  const {top3}=useContext(UserContext)
  if (top3.length < 3) {
    return (
      <div className='flex items-center justify-center p-10 text-amber-50/30 text-sm'>
        need at least 3 songs to show the podium
      </div>
    )
  }
  return (
    <div className='flex flex-col gap-5 p-5 min-w-4xl max-sm:min-w-xs '>
      <span className='text-sm font-light text-amber-50/50 max-sm:ml-2'>TOP 3 THIS SESSION</span>
      <div className='flex items-end gap-5 justify-center max-sm:gap-1'>
        <div className='relative border border-neutral-500/50 bg-neutral-900 h-80 w-54 rounded-lg overflow-hidden flex flex-col hover:-translate-y-1 transition-transform duration-200
        max-sm:w-30 max-sm:h-77'>
            <img src={top3[1].cover}
            alt='song-cover'
            className='w-full h-54 object-cover'
            ></img>
            <span className='absolute top-2 left-2 text-2xl bg-yellow-400 rounded-full'>
                🥈
            </span>
            <div className='flex flex-col flex-1 overflow-hidden px-2 py-1'>
              <span className='text-md text-amber-50 truncate'>{top3[1].songName}</span>
              <span className='text-sm font-light text-amber-50/50 truncate'>{top3[1].artist}</span>
              <span className='text-purple-500/80'>❤︎ {top3[1].likes} likes</span>
              <span className='text-xs font-light text-amber-50/50 truncate'>dropped by {top3[1].addedBy}</span>
            </div>
        </div>
        <div className='relative border border-neutral-500/50 bg-neutral-900 h-90 w-60 rounded-lg overflow-hidden flex flex-col hover:-translate-y-1 transition-transform duration-200
        max-sm:w-30 max-sm:h-87'>
            <img src={top3[0].cover}
            alt='song-cover'
            className='w-full h-64 object-cover'
            ></img>
            <span className='absolute top-2 left-2 text-2xl bg-yellow-400 rounded-full'>
                🥇
            </span> 
            <div className='flex flex-col flex-1 overflow-hidden px-2 py-1'>
              <span className='text-md text-amber-50 truncate'>{top3[0].songName}</span>
              <span className='text-sm font-light text-amber-50/50 truncate'>{top3[0].artist}</span>
              <span className='text-purple-500/80'>❤︎ {top3[0].likes} likes</span>
              <span className='text-xs font-light text-amber-50/50 truncate'>dropped by {top3[0].addedBy}</span>
            </div>
        </div>
        <div className='relative border border-neutral-500/50 bg-neutral-900 h-76 w-54 rounded-lg overflow-hidden flex flex-col hover:-translate-y-1 transition-transform duration-200
        max-sm:w-30 max-sm:h-73'>
            <img src={top3[2].cover}
            alt='song-cover'
            className='w-full h-50 object-cover'
            ></img>
            <span className='absolute top-2 left-2 text-2xl bg-yellow-400 rounded-full'>
                🥉
            </span>
            <div className='flex flex-col flex-1 overflow-hidden px-2 py-1'>
              <span className='text-md text-amber-50 truncate'>{top3[2].songName}</span>
              <span className='text-sm font-light text-amber-50/50 truncate'>{top3[2].artist}</span>
              <span className='text-purple-500/80'>❤︎ {top3[2].likes} likes</span>
              <span className='text-xs font-light text-amber-50/50 truncate'>dropped by {top3[2].addedBy}</span>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Podium
