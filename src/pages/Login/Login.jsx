import React, { useEffect, useState } from 'react'
import './Login.css'
import { InputText } from '../../common/InputText/InputText'

import { useDispatch, useSelector } from 'react-redux'
import { login, userData } from '../userSlice'
import { logInUsers } from '../../services/apiCalls'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userRDX = useSelector(userData)

  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  })

  const credentialsHandler = (e) => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const logInButton = () => {
    
    logInUsers(credentials)
      .then((res)=> {
        dispatch(login(res))
        console.log(res);
        navigate("/")
      })
      .catch(e => {
        console.log('ERROR:', e);
      })
  }

  useEffect(()=> {
    if(userRDX.credentials?.token) {
      navigate("/")
    }
  }, [])
  
  return (
    <div className='login-container flex-c-c'>
      <div className='form'>
        <label>Email</label>
        <InputText 
          type={"email"}
          className={"input-login"}
          placeholder={"example@gmail.com"}
          name={"email"}
          handler={credentialsHandler}
        />
        <label>Password</label>
        <InputText 
          type={"password"}
          className={"input-login"}
          placeholder={"Insert Password"}
          name={"password"}
          handler={credentialsHandler}/>
        <button onClick={()=> logInButton()}>Login</button>
      </div>
    </div>
  )
}

export default Login
