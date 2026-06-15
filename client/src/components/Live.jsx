import React from 'react'

const Live = () => {
  return (
    <div className='pb-6 fixed bottom-0 left-1/2 transform -translate-x-1/2 w-64 flex justify-center'>
        <div className='flex gap-2 items-center bg-amber-50/10 p-2 px-6 border border-amber-50/30 rounded-full'>
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
            <span>5 people online</span>
        </div>
    </div>
  )
}

export default Live
