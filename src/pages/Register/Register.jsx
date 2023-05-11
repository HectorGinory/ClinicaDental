import React, { useState } from 'react'
import { InputText } from '../../common/InputText/InputText'

const Register = () => {
    const [credentials, setCredentials] = useState({
        name: "",
        password: "",
        email: "",
        number: "",
        address: ""
      })
    
    const credentialsHandler = (e) => {
        setCredentials((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value
        }))
      }
  return (
    <div className='body flex-c-c'>
      <div className='register-container'>
        <label>
            <p>Name:</p>
            <InputText 
                type={"text"}
                className={"input-register"}
                placeholder={"Insert name"}
                name={"email"}
                handler={credentialsHandler}
                required={true}
                />
        </label>
        <label>
            <p>Email:</p>
            <InputText 
                type={"email"}
                className={"input-register"}
                placeholder={"Email@gmail.com"}
                name={"email"}
                handler={credentialsHandler}
                required={true}
                />
        </label>
        <label>
            <p>Password:</p>
            <InputText 
                type={"password"}
                className={"input-register"}
                placeholder={"password"}
                name={"password"}
                handler={credentialsHandler}
                required={true}
                />
        </label>
        <label>
            <p>Number:</p>
            <InputText 
                type={"text"}
                className={"input-register"}
                placeholder={"Your telephone"}
                name={"number"}
                handler={credentialsHandler}
                required={true}
                />
        </label>
        <label>
            <p>Addres:</p>
            <InputText 
                type={"text"}
                className={"input-register"}
                placeholder={"Your telephone"}
                name={"address"}
                handler={credentialsHandler}
                required={true}
                />
        </label>
        <label>
            <p>DNI:</p>
            <InputText 
                type={"text"}
                className={"input-register"}
                placeholder={"XXXXXXXXX"}
                name={"dni"}
                handler={credentialsHandler}
                required={true}
                />
        </label>
        <button>Register</button>
      </div>
    </div>
  )
}

export default Register
