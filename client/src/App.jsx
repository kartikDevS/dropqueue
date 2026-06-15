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

const App = () => {
  const [user, setUser] = useState(null)
  const [songs, setSongs] = useState([])
  const [chart, setChart] = useState(false)
  const [error, setError] = useState(null)
  const [topSongs, settopSongs] = useState([])
  const [login, setLogin] = useState(true)

  const top3= topSongs.slice(0,3)

  useEffect(() => {
    const initialFetch= async()=>{
      try {
        const apiUrl = import.meta.env.VITE_API_URL
        const res = await api.get('/song')
        setSongs(res.data)
      } catch (err) {
        console.error(err)
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
      setSongs(prev=>prev.map(song=> song._id===id ? res.data : song))
      settopSongs(prev => prev.map(song => song._id === id ? res.data : song))
    } catch (err){
      console.error(err)
    }
  }

  const deletesong= async(id)=>{
    try{
      const apiUrl = import.meta.env.VITE_API_URL
      const res= await api.delete(`/song/${id}`)
      setSongs(prev => prev.filter(song => song._id !== id))
    } catch (err){
      const message = err.response?.data?.error || "Failed to delete song"
      setError(message)
    }
  }

  return (
    <div className=' text-white flex flex-col items-center h-screen'>
      <UserContext.Provider value={{user,makeuser:setUser,songs,makesong:setSongs,chart,
        makechart:setChart,error,makeerror:setError,likeSong,topSongs,top3,deletesong,
        login,setlogin:setLogin}}>
        {error && <Error error={error} onClose={() => setError(null)}/>}
        {!user && <AuthModal/>}
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
