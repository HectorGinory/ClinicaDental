import React, { useEffect, useState } from "react";
import { InputText } from "../../common/InputText/InputText";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { FilteredInformation } from "../../common/FilteredInformation/FilteredInformation";
import { createNewQuote, findAllOfAny } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";

const NewQuote = () => {
  const [credentials, setCredentials] = useState({
    customer: "",
    dentist: "",
    quote: "",
    dateOfQuote: "",
    endOfQuote: "",
  });
  const userRdxData = useSelector(userData);
  const [data, setData] = useState([]);
  const [criteria, setCriteria] = useState("");
  const [chooseCustomer, setChooseCustomer] = useState(true);
  const [specialities, setSpecialities] = useState([]);
  const [dateInfo, setDateInfo] = useState({
    dateOfQuote: "",
    hour: "",
    duration: ""
  })
  const [specialitieChoosed, setSpecialitieChoosed] = useState({})

  const navigate = useNavigate()
  const hours = ["10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00"]
  
  useEffect(() => {
    if (userRdxData.credentials.user.rol === "Cliente") {
      setChooseCustomer(false);
      setCredentials((prevState) => ({
        ...prevState,
        customer: userRdxData.credentials.user.id,
      }));
    }
    findAllOfAny(userRdxData.credentials.token, "specialitie", "").then(
      (res) => {
        setSpecialities(res);
      }
    );
  }, [userRdxData]);

  useEffect(() => {
    if (criteria !== "") {
      const bringUsers = setTimeout(() => {
        findAllOfAny(userRdxData.credentials.token, "user", criteria)
          .then((searchResults) => {
            setData(searchResults);
          })
          .catch((error) => console.log(error));
      }, 375);

      return () => clearTimeout(bringUsers);
    } else {
      findAllOfAny(userRdxData.credentials.token, "user", criteria).then(
        (res) => {
          setData(res);
        }
      );
    }
  }, [criteria]);

  const createQuote = async() => {
    const dateOfQuote = (new Date(`${dateInfo.dateOfQuote}T${dateInfo.hour}:00`)).getTime()
    const endMiliseconds = dateOfQuote + (dateInfo.duration*60*1000)
    if(userRdxData.credentials.user.rol === "Dentista" && userRdxData.credentials.user.id !== credentials.dentist) throw new Error('You cant create a quote for an other dentist')
    await setCredentials((prevState) => ({
      ...prevState,
      dateOfQuote: dateOfQuote,
      endOfQuote: endMiliseconds
    }));
    createNewQuote(userRdxData.credentials.token, credentials).then((res)=> {
      navigate("/")
    })
  }

  const criteriaHandler = (e) => {
    setCriteria(e.target.value);
  };

  const customerChoosed = (id) => {
    setCredentials((prevState) => ({
      ...prevState,
      customer: id,
    }));
    setChooseCustomer(false);
  };

  return (
    <div className="newquote-container">
      <div className="newquote-form">
        {chooseCustomer ? (
          <div className="choose-user">
            <input
              onChange={(e) => criteriaHandler(e)}
              name="criteria"
              type="text"
            />
            <div className="filtered-information">
              {data.length !== 0 &&
                data.map((res) => (
                  <div
                    className="user click"
                    onClick={() => customerChoosed(res._id)}
                    key={res._id}
                  >
                    <p>
                      <span>{res.name}</span>
                      <span>{` - ${res.dni}`}</span>
                    </p>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <div className="newQuote">
            <label>Date</label>
            <input type="date" onChange={(e)=>setDateInfo((prev) => ({...prev, dateOfQuote: e.target.value}))}></input>
            <label>Quote</label>
            <div className="quote-selection">
              {specialities.map((data) => {
                return (
                  <div className="specialitie" key={data.id} onClick={()=>{
                    setCredentials((prev) => ({...prev, quote: data._id}))
                    setDateInfo((prev) => ({...prev, duration: data.duration}))
                    setSpecialitieChoosed(data)
                  }}>
                    <p>{`${data.name} - ${data.price}`}</p>
                  </div>
                );
              })}
            </div>
            <div className="hour-selection">
              {hours.map((hour, index)=>{
                return(
                  <div key={index} className="click" onClick={()=>setDateInfo((prev) => ({...prev, hour: hour}))}>
                    <p>{hour}</p>
                  </div>
                )
              })}
            </div>
            <div className="dentist-selection">
            {Object.keys(specialitieChoosed).length > 0 && 
              specialitieChoosed.dentists.map((data)=> {
              return (
                <p className="click" onClick={()=>setCredentials((prev) => ({...prev, dentist: data._id}))}>{data.name}</p>
              )
            })}
            </div>
            <button type="submit" onClick={()=>createQuote()}>aaaa</button>
          </div>
        )}
      </div>
      <div onClick={()=>console.log(credentials, dateInfo)}>asss</div>
    </div>
  );
};

export default NewQuote;
