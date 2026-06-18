import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Addsongbar from './components/Addsongbar'
import SongsGrid from './components/SongsGrid'
import AuthModal from './components/AuthModal'
import { UserContext } from './contexts/UserContext'
import Podium from './components/Podium'
import CharList from './components/CharList'
import LeaderBoard from './components/LeaderBoard'
import Live from './components/Live'
import Error from './components/Error'
import axios from 'axios'
import api from './api/api'
import socket from './socket'  

const App = () => {
  const [user, setUser] = useState(null)
  const [songs, setSongs] = useState([])
  const [chart, setChart] = useState(false)
  const [error, setError] = useState(null)
  const [topSongs, settopSongs] = useState([])
  const [login, setLogin] = useState(true)
  const [toast, setToast] = useState(null)
  const [loading, setLoading] = useState(true)

  const top3= topSongs.slice(0,3)



useEffect(() => {
  socket.off('song-added')
  socket.on('song-added', (newSong) => {
    setSongs(prev => {
      const exists = prev.find(s => s._id === newSong._id)
      if (exists) return prev 
      return [...prev, newSong]
    })
    if (newSong.addedBy !== user) {
      setToast(`${newSong.addedBy} just dropped ${newSong.songName} 🔥`)
    }
    else{
      setToast('song added successfully!')
    }
    setTimeout(() => setToast(null), 4000) 
  })

 
  socket.on('song-liked', (updatedSong) => {
    setSongs(prev => prev.map(s => s._id === updatedSong._id ? updatedSong : s))
    settopSongs(prev => prev.map(s => s._id === updatedSong._id ? updatedSong : s))
  })

  socket.on('song-deleted',(deletedSongId)=>{
    setSongs(prev=> prev.filter(s=> s._id!==deletedSongId))
  })


  return () => {
    socket.off('song-added')
    socket.off('song-liked')
  }
}, [user])

  useEffect(() => {
    const initialFetch= async()=>{
      try {
        const apiUrl = import.meta.env.VITE_API_URL
        const res = await api.get('/song')
        setSongs(res.data)
      } catch (err) {
        console.error(err)
      } finally{
        setLoading(false)
      }
    }
    initialFetch()
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    if (saved && token) setUser(saved)
  }, [])

  useEffect(()=>{
    const fetchTop= async()=>{
      try{
        const apiUrl = import.meta.env.VITE_API_URL
        const res= await api.get('/song/top10')
        settopSongs(res.data)
      } catch (err){
        console.error(err)
      }
    }
    fetchTop()
  },[songs])

  const likeSong= async(id)=>{
    try{
      const res= await api.put(`/song/${id}/like`)
    } catch (err){
      console.error(err)
    }
  }

  const deletesong= async(id)=>{
    try{
      const res= await api.delete(`/song/${id}`)
    } catch (err){
      const message = err.response?.data?.error || "Failed to delete song"
      setError(message)
    }
  }

  return (
    <div className=' text-white flex flex-col items-center h-screen'>
      <UserContext.Provider value={{user,makeuser:setUser,songs,chart,
        makechart:setChart,error,makeerror:setError,likeSong,topSongs,top3,deletesong,
        login,setlogin:setLogin,loading}}>
        {error && <Error error={error} onClose={() => setError(null)}/>}
        {!user && <AuthModal/>}
        {toast && (
          <div className='fixed bottom-6 left-1/2 -translate-x-1/2 z-50
          bg-neutral-900 border border-purple-500/50 text-amber-50 
          text-sm px-5 py-3 rounded-full shadow-lg shadow-purple-900/30
          animate-fade-in'>
            {toast}
          </div> 
        )}
        <Navbar/>
        {!chart ? (
          <>
            <Addsongbar/>
            <SongsGrid/>
          </>
        ):(
          <>
            <Podium/>
            <CharList/>
            <LeaderBoard/>
          </>
        )
        } 
        <Live/>
      </UserContext.Provider>
    </div>
  )
}

export default App
