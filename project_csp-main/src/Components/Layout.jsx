import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import setupInterceptor from '../axios/Interceptor'
import { currentUser, refreshToken } from '../redux/features/auth/authSlice'
import store from '../redux/store/store'
import Footer from '../screens/Footer/Footer'
import Navbar from '../screens/NavBar/Navbar'

const Layout = () => {
  setupInterceptor(store)

  const dispatch=useDispatch()
  useEffect(()=>{
    async function fetchData(){
    await dispatch(refreshToken())


      dispatch(currentUser())
    } 
    fetchData()

  
     
    
  },[dispatch])


  return (
    <>
       < Navbar/>
       <Outlet/>
       <Footer />
       </>
  )
}

export default Layout