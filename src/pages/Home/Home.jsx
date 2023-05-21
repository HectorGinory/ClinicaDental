import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, userData } from "../../pages/userSlice";
import './Home.css'
import Logo_1 from '../../assets/tooth.png'

const Home = () => {
  const navigate = useNavigate();
  const userRdxData = useSelector(userData);
  const dispatch = useDispatch();
  return (
    <>
      <div className='home-container flex-c-c container'>
        <div className='text-container'>
          <h1>Dr. Smile</h1>
          <h2>Your trusted dentist</h2>
          <p>
            We are a dental clinic in Madrid that offers a medical team of specialized 
            dentists and a dental clinic with the most cutting-edge technology in the sector. We 
            intend to combine science, technology, personal treatment and price. The treatments 
            that we carry out in the clinic are always carried out by qualified dentists and experts
            in the field, seeking the treatment that best suits each patient.
          </p>
          {userRdxData.credentials.token ? 
          <button onClick={()=>navigate("/newquote")} className='btn'>Create Quote</button> :
          <>
          <button onClick={()=>navigate("/login")} className='btn'>Login</button>
          <button onClick={()=>navigate("/register")} className='btn'>Register</button>
          </>}
        </div>
        <div className='image-container flex-c-c'>
          <img src={Logo_1} alt="clinicial dentist photo" className='image'/>
        </div>
      </div>
    </>
  )
}

export default Home
