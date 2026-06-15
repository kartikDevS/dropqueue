import React, { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

const LeaderBoard = () => {

    const {songs}=useContext(UserContext)

    const contributors = songs.reduce((acc, song) => {
        if (!acc[song.addedBy]) {
            acc[song.addedBy] = { name: song.addedBy, totalLikes: 0, songCount: 0 }
        }
        acc[song.addedBy].totalLikes += song.likes
        acc[song.addedBy].songCount += 1
        return acc
        }, {})

        const sorted = Object.values(contributors)
        .sort((a, b) => b.totalLikes - a.totalLikes).slice(0,4)

  return (
    <div className='flex flex-col gap-5 p-5 max-sm:p-2'>
        <span className='text-sm font-light text-amber-50/50 px-5'>SQUAD LEADERBOARD</span>
        <div className='flex gap-2'>
            {sorted.map(person => (
            <div key={person.name} className='bg-amber-50/10 border border-amber-50/20 w-50 h-44 rounded-lg flex flex-col p-5 max-sm:w-20 max-sm:p-2'>
                <span className='bg-purple-500/30 text-purple-400 w-12 max-sm:w-12 h-12 rounded-full flex items-center justify-center font-semibold'>
                {person.name.slice(0, 2).toUpperCase()}
                </span>
                <span>{person.name}</span>
                <span className='text-sm font-light text-amber-50/50'>{person.songCount} songs dropped</span>
                <span className='font-semibold text-lg'>{person.totalLikes}</span>
                <span className='text-sm font-light text-amber-50/50'>total likes</span>
            </div>
            ))}
        </div>
    </div>
  )
}

export default LeaderBoard
