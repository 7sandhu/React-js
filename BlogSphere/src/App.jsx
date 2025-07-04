import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .catch(() => {
      dispatch(logout())
    })
    .finally(() => setLoading(false))
  }, [])
  
  return !loading ? (
    <div className='min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-blue-50'>
      <Header />
      <main className='flex-1'>
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50'>
      <div className='text-center'>
        <div className='spinner h-16 w-16 mx-auto mb-6'></div>
        <h2 className='text-2xl font-semibold text-gray-700 mb-2'>Loading BlogSphere</h2>
        <p className='text-gray-500'>Please wait while we set things up...</p>
      </div>
    </div>
  )
}

export default App