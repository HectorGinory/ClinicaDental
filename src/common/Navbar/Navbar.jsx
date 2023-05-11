import React from 'react'
import { useNavigate } from "react-router-dom"
import logo from '../../assets/gintooth_white.png'

import './navbar.css'
import { useDispatch, useSelector } from 'react-redux'
import { logout, userData } from '../../pages/userSlice'

const Navbar = () => {
    const navigate = useNavigate()
    const userRdxData = useSelector(userData)
    const dispatch = useDispatch()
  return (
    <>
      <div className='navbar-container'>
        <img src={logo} alt='clinic_logo'/>
        <div className='btn-container'>
            <div className='btn-navbar click' onClick={()=>navigate("/")}>Home</div>
            {!userRdxData.credentials?.token ? 
            <>      
              <div className='btn-navbar click' onClick={()=>navigate("/register")}>Register</div>
              <div className='btn-navbar click' onClick={()=>navigate("/login")}>Login</div>
            </>:
            <>
            <div className='btn-navbar click' onClick={()=>navigate("/profile")}>Profile</div>
            <div className='btn-navbar click' onClick={()=>navigate("/newquote")}>New Quote</div>
            <div className='btn-navbar click' onClick={()=>{dispatch(logout())}}>Logout</div>
            </>}
        </div>
      </div>
    </>
  )
}

export default Navbar
