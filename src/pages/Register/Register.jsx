import React, { useState } from 'react'
import './Register.css'
import { InputText } from '../../common/InputText/InputText'
import { registerUsers } from '../../services/apiCalls'
import { useDispatch } from 'react-redux'
import { login } from '../userSlice'
import { useNavigate } from 'react-router'

const Register = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const [credentials, setCredentials] = useState({
        name: "",
        password: "",
        email: "",
        number: "",
        address: "",
        dni: ""
      })
    
    const credentialsHandler = (e) => {
        setCredentials((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value
        }))
      }
    
    const registerButton = () => {
        registerUsers(credentials)
          .then((res)=> {
            dispatch(login(res))
            navigate("/")
          })
          .catch(e => {
            console.log('ERROR:', e);
          })
      }
  return (
      <div className='register-container flex-c-c container'>
      <h2>Register</h2>
      <div className='form flex-c-c'>
      <label>
            <p>Name:</p>
            <InputText 
                type={"text"}
                className={"input"}
                placeholder={"Name and surname"}
                name={"name"}
                handler={credentialsHandler}
                required={true}
                value={credentials.name}
                />
        </label>
        <label>
            <p>Email:</p>
            <InputText 
                type={"email"}
                className={"input"}
                placeholder={"Email@gmail.com"}
                name={"email"}
                handler={credentialsHandler}
                required={true}
                value={credentials.email}
                />
        </label>
        <label>
            <p>Password:</p>
            <InputText 
                type={"password"}
                className={"input"}
                placeholder={"Password"}
                name={"password"}
                handler={credentialsHandler}
                required={true}
                value={credentials.password}
                />
        </label>
        <label>
            <p>Number:</p>
            <InputText 
                type={"text"}
                className={"input"}
                placeholder={"Your telephone"}
                name={"number"}
                handler={credentialsHandler}
                required={true}
                value={credentials.number}
                />
        </label>
        <label>
            <p>Address:</p>
            <InputText 
                type={"text"}
                className={"input"}
                placeholder={"Your address"}
                name={"address"}
                handler={credentialsHandler}
                required={true}
                value={credentials.address}
                />
        </label>
        <label>
            <p>DNI:</p>
            <InputText 
                type={"text"}
                className={"input"}
                placeholder={"XXXXXXXXX"}
                name={"dni"}
                handler={credentialsHandler}
                required={true}
                value={credentials.dni}
                />
        </label>
      </div>
      <div className="btn-container">
        <button onClick={()=>registerButton()} className="btn">Register</button>
        <button onClick={() => navigate("/login")} className="btn">Login</button>
      </div>
    </div>
  )
}

export default Register
