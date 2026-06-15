import React, { useEffect } from 'react'

const Error = ({ error, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 1000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 
                    bg-purple-500/10 px-6 py-3 rounded-full border border-purple-500/30 shadow-lg z-50">
                        <span className='text-red-500/60'>OOOPS... </span>
                        <span className='text-purple-500'>{error}</span>
    </div>
  )
}

export default Error
