import React, { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

const Navbar = () => {
    const {user,chart,makechart,makeuser}=useContext(UserContext)
    
    const toggleC=()=>{
      makechart(true)
    }
    const toggleQ=()=>{
      makechart(false)
    }

    const logout = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      makeuser(null)
    }

  return (
    <div className='p-5 flex justify-between min-w-5xl border-b border-amber-50/20
    max-sm:p-2 max-sm:min-w-xs '>
      <h1 className="text-4xl font-bold font-serif
      max-sm:text-xl">
        <span className="text-white">Drop</span>
        <span className="text-purple-600">Queue</span>
        </h1>
        <div className='flex gap-5 
        max-sm:gap-0 max-sm:ml-2'>
          <div className='flex gap-2 
          max-sm:gap-1'>
            <div className='bg-neutral-800/80 flex gap-2 items-center rounded-full py-2 px-4 font-lighter text-sm text-amber-50
            max-sm:px-1 max-sm:text-xs max-sm:gap-1'>
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse
                max-sm:w-2 max-sm:h-2"></div>
                <span className='max-sm:pb-0.5'>collab session</span>
            </div>
            <div className='bg-neutral-800/80 rounded-full py-2 px-4 font-lighter text-sm text-amber-50
            max-sm:py-2 max-sm:px-2 max-sm:text-xs'>
              <span >you are: </span>
              <span className='text-purple-400'>{user}</span>
              <span onClick={logout} className='hover:underline cursor-pointer hover:text-purple-400'><br></br>click to logout</span>
            </div>
          </div>
          {chart ?(<span onClick={toggleQ}
          className='text-3xl rounded-full cursor-pointer transition-all duration-150 hover:scale-120'>
            🎵</span>):
          (
            <span onClick={toggleC}
            className='text-3xl rounded-full cursor-pointer transition-all duration-150 hover:scale-120
            max-sm:text-2xl'>
              🏆</span>
          )}
        </div>
    </div>
  )
}

export default Navbar
