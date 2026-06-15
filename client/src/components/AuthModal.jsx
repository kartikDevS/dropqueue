import React, { useContext, useRef, useState } from 'react'
import { UserContext } from '../contexts/UserContext'
import axios from 'axios'
import api from '../api/api'

const AuthModal = () => {
  const usernameRef = useRef(null)
  const passwordRef = useRef(null)
  const { makeuser } = useContext(UserContext)
  const [isLogin, setIsLogin] = useState(true)
  const [errMsg, setErrMsg] = useState('')
  const [loading, setLoading] = useState(false)

  const apiUrl = import.meta.env.VITE_API_URL

  const handleSubmit = async () => {
    const username = usernameRef.current.value.trim()
    const password = passwordRef.current.value.trim()

    if (!username || !password) {
      setErrMsg('fill in both fields')
      return
    }

    setLoading(true)
    setErrMsg('')

    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register'
      const res = await api.post(`${endpoint}`, { username, password })


      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', res.data.username)
      makeuser(res.data.username)

    } catch (err) {
      setErrMsg(err.response?.data?.message || 'something went wrong')
    }

    setLoading(false)
  }

  return (
    <div className='fixed inset-0 z-50 bg-black/95 flex justify-center items-center'>
      <div className='bg-zinc-900 max-w-xl w-full flex flex-col p-10 rounded-2xl gap-4'>


        <h1 className='text-4xl font-bold font-serif'>
          <span className='text-white'>Drop</span>
          <span className='text-purple-600'>Queue</span>
        </h1>
        <span className='text-zinc-500 text-sm -mt-2'>discover new 🎵</span>


        <div className='flex gap-2 bg-zinc-800 p-1 rounded-lg'>
          <button
            onClick={() => { setIsLogin(true); setErrMsg('') }}
            className={`flex-1 py-2 rounded-md text-sm font-semibold transition-colors duration-150
              ${isLogin ? 'bg-purple-600 text-white' : 'text-zinc-400 hover:text-white'}`}>
            Login
          </button>
          <button
            onClick={() => { setIsLogin(false); setErrMsg('') }}
            className={`flex-1 py-2 rounded-md text-sm font-semibold transition-colors duration-150
              ${!isLogin ? 'bg-purple-600 text-white' : 'text-zinc-400 hover:text-white'}`}>
            Register
          </button>
        </div>


        <input
          ref={usernameRef}
          type='text'
          placeholder='username'
          className='border rounded-lg border-white/10 bg-zinc-950 p-2 focus:outline-none transition-colors duration-200 focus:border-purple-400 text-white'
        />
        <input
          ref={passwordRef}
          type='password'
          placeholder='password'
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          className='border rounded-lg border-white/10 bg-zinc-950 p-2 focus:outline-none transition-colors duration-200 focus:border-purple-400 text-white'
        />


        {errMsg && <span className='text-red-400 text-sm'>{errMsg}</span>}


        <button
          onClick={handleSubmit}
          disabled={loading}
          className='bg-purple-500/50 hover:bg-purple-500 transition-colors duration-150 p-2 rounded-lg disabled:opacity-50 font-semibold'>
          {loading ? 'please wait...' : isLogin ? 'Login' : 'Create Account'}
        </button>


        <span className='text-zinc-500 text-xs text-center'>
          {isLogin ? "don't have an account? " : "already have an account? "}
          <span
            onClick={() => { setIsLogin(!isLogin); setErrMsg('') }}
            className='text-purple-400 cursor-pointer hover:underline'>
            {isLogin ? 'register' : 'login'}
          </span>
        </span>

      </div>
    </div>
  )
}

export default AuthModal