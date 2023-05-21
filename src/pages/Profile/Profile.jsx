import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { findAllOfAny, getUserInfo, updateUserId } from '../../services/apiCalls'
import { userData } from '../userSlice'
import Spinner from '../../common/Spinner/Spinner'
import { useNavigate } from 'react-router'
import { InputText } from '../../common/InputText/InputText'
import './Profile.css'

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

    const formatedDate = (stringDate) => {
      const date = new Date(stringDate);
      const formattedDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    
      const formattedTime = date.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      });
    
      return `${formattedDate} ${formattedTime}`;
    };
  return (
    <div className='flex-c-c'>
    {!user?.name ? 
    <>
      <Spinner />
    </> 
    : 
    <div className='profile-info container flex-c-c'>
        <div className='principal-info container flex-c-c'>
          {changeProfile ? <
          >
          <div className='change-quote'>
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
        </div>
        <button onClick={()=>updateUser()}>Set Info</button>
        </> :
          <>
          <div className=''>
            <p>{user.name.charAt(0).toUpperCase() + user.name.slice(1)}</p>
            <p>{user.email.charAt(0).toUpperCase() + user.email.slice(1)}</p>
            <p>{user.number}</p>
            <p>{user.dni}</p>
            <p>{user.address}</p>
          </div>
            <button onClick={()=>setChangeProfile(true)}>Change Info</button>
          </>}
        </div>
        <div className='quotes-info container flex-c-c'>
          {userRdxData.credentials.user.rol === "Admin" ? 
          <div className='btn-admin flex-c-c'>
            <button onClick={()=>navigate("/admin")}>Check admin info</button>
          </div> :
          <div className='quote-list'>
            {quotes.map(quote => {
              return (
                <div className='quote flex-c-c c' onClick={()=>navigate(`/quote/${quote._id}`)} key={quote._id}>
                <p>{formatedDate(quote.dateOfQuote)}</p>
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
