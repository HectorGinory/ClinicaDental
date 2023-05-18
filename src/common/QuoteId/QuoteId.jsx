import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { userData } from '../../pages/userSlice'
import { getQuoteId, uploadQuoteById } from '../../services/apiCalls'
import Spinner from '../spinner/Spinner'

const QuoteId = () => {

    const quoteId = useParams().quoteId
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userRdxData = useSelector(userData)

    const [quote, setQuote] = useState([])
    const [changeQuote, setChangeQuote] = useState(false)
    const [credentials, setCredentials] = useState({
        customer: "",
        dentist: "",
        quote: "",
        dateOfQuote: "",
        endOfQuote: "",
    });

    useEffect(()=> {
        getQuoteId(userRdxData.credentials.token, quoteId).then((res)=> {
            setQuote(res)
        })
        .catch((e)=>{
            navigate("/")
            
        })
      },[])

      useEffect(()=> {
        if(!!quote.customer) {
          setCredentials({
            customer: quote.customer._id,
            dentist: quote.dentist._id,
            quote: quote.quote._id,
            dateOfQuote:quote.dateOfQuote,
            endOfQuote: quote.endOfQuote
          })

          setDateInfo((prev) => ({
            ...prev,
            duration: (new Date(quote.endOfQuote) - new Date(quote.dateOfQuote))
          }))
        }
      }, [quote])

      const hours = ["10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00"]
      const [dateInfo, setDateInfo] = useState({
        dateOfQuote: "",
        hour: "",
        duration: ""
      })

      useEffect(() => {
        const dateOfQuote = (new Date(`${dateInfo.dateOfQuote}T${dateInfo.hour}:00`)).getTime()
        const endMiliseconds = dateOfQuote + (dateInfo.duration)
        setCredentials((prevState) => ({
          ...prevState,
          dateOfQuote: dateOfQuote,
          endOfQuote: endMiliseconds
        }))
      }, [dateInfo])

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

      const uploadQuote = () => {
        uploadQuoteById(userRdxData.credentials.token, quoteId, credentials).then((res)=> {
          navigate("/profile")
        })
      }
  return (
    <>
    {Object.keys(quote).length === 0 ? 
    <>
        <Spinner />
    </>
    :    
    <>
    <div className='actual-quote'>
      <h3>Actual Quote</h3>
      <p>Customer: {quote.customer.name}</p>
      <p>Dentist: {quote.dentist.name}</p>
      <p>Type of quote: {quote.quote.name}</p>
      <p>At: {formatedDate(quote.dateOfQuote)}</p>
      <button onClick={()=>setChangeQuote(true)}>Change Day</button>
    </div>
    {changeQuote && 
      <div className='actual-quote'>
      <h3>Change Quote</h3>
      <p>At:</p>
      <input type="date" onChange={(e)=>{
        setDateInfo((prev) => ({...prev, dateOfQuote: e.target.value}))
      }}></input>
      <div className='hourInput-container'>
      {hours.map((hour, index)=>{
                return(
                  <div key={index} className="click" onClick={()=>setDateInfo((prev) => ({...prev, hour: hour}))}>
                    <p>{hour}</p>
                  </div>
                )
      })}
      </div>
      <button onClick={()=>uploadQuote()}>Save Changes</button>
    </div>
    }
    </>
    }
    </>
  )
}

export default QuoteId
