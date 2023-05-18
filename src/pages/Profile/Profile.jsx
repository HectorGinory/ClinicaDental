import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { findAllOfAny, getUserInfo, updateUserId } from '../../services/apiCalls'
import { userData } from '../userSlice'
import Spinner from '../../common/Spinner/Spinner'
import { useNavigate } from 'react-router'
import { InputText } from '../../common/InputText/InputText'

const Profile = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userRdxData = useSelector(userData)
  
  const [user, setUser] = useState({})
  const [quotes, setQuotes] = useState([])
  const [changeProfile, setChangeProfile] = useState(false)
  const [credentials, setCredentials] = useState({
    name: user.name,
    email: user.email,
    number: user.number,
    address: user.address,
    dni: user.dni
  })

  useEffect(()=> {
    if(userRdxData.credentials?.token) {
      getUserInfo(userRdxData.credentials.user.id, userRdxData.credentials.token).then(
        res => setUser(res)
      )
      if(userRdxData.credentials.user.rol !== "Admin") {
        findAllOfAny(userRdxData.credentials.token, "quote", "").then((res) => {
          setQuotes(res)
        })
      }
    } else {
      navigate("/")
    }
  },[])

  useEffect(()=> {
    setCredentials({
      name: user.name,
      email: user.email,
      number: user.number,
      address: user.address,
      dni: user.dni
    })
  }, [user])

const credentialsHandler = (e) => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const updateUser = () => {
    updateUserId(userRdxData.credentials.user.id, credentials, userRdxData.credentials.token)
    .then((res) => {
      setUser(res)
      setChangeProfile(false)
    })
      
    }
  return (
    <div className='flex-c-c'>
    {!user?.name ? 
    <>
      <Spinner />
    </> 
    : 
    <div className='profile-info container'>
        <div className='principal-info'>
          {changeProfile ? <>
            <label>
            <p>Name:</p>
            <InputText 
                type={"text"}
                className={"input"}
                placeholder={"Insert name"}
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
                placeholder={"Your telephone"}
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
                className={"input-register"}
                placeholder={"XXXXXXXXX"}
                name={"dni"}
                handler={credentialsHandler}
                required={true}
                value={credentials.dni}
                />
        </label>
        <button onClick={()=>updateUser()}>Set Info</button>
        </> :
          <>
            <p>{user.name.charAt(0).toUpperCase() + user.name.slice(1)}</p>
            <p>{user.email.charAt(0).toUpperCase() + user.email.slice(1)}</p>
            <p>{user.number}</p>
            <p>{user.dni}</p>
            <p>{user.address}</p>
            <button onClick={()=>setChangeProfile(true)}>Change Info</button>
          </>}
        </div>
        <div className='quotes-info'>
          {userRdxData.credentials.user.rol === "Admin" ? 
          <button onClick={()=>navigate("/admin")}>Check info</button> :
          <div className='quote-list'>
            {quotes.map(quote => {
              return (
                <div className='quote' onClick={()=>navigate(`/quote/${quote._id}`)}>
                {/* <p>{quote.customer.name}</p> */}
                <p>CITA SSSSS</p>
                </div>
              )
            })}
          </div>
          }
        </div>
    </div>}

    </div>
  )
}

export default Profile
