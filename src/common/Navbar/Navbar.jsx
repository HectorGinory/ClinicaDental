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
        <div className='name-clinic click' onClick={()=>navigate("/")}>
          <p>Clinica dental</p>
          <p>Dr. SMILE</p>
        </div>
        <div className='btn-container'>
        <div>
            <div className='btn-navbar click' onClick={()=>navigate("/")}>Home</div>
        </div>
            {!userRdxData.credentials?.token ? 
            <>      
            <div>
              <div className='btn-navbar click' onClick={()=>navigate("/register")}>Register</div>
            </div>
            <div>
              <div className='btn-navbar click' onClick={()=>navigate("/login")}>Login</div>
            </div>
            </>:
            <>
            {userRdxData.credentials.user.rol === "Admin" &&
            <div>
            <div className='btn-navbar click' onClick={()=>navigate("/Admin")}>Admin</div>
            </div>
            }
            <div>
            <div className='btn-navbar click' onClick={()=>navigate("/profile")}>Profile</div>
            </div>
            <div>
            <div className='btn-navbar click' onClick={()=>navigate("/newquote")}>New Quote</div>
            </div>
            <div>
            <div className='btn-navbar click' onClick={()=>{
              dispatch(logout())
              navigate("/")
            }}>Logout</div>
            
            </div>
            </>}
        </div>
      </div>
    </>
  )
}

export default Navbar
