import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../../pages/userSlice";
import { findAllOfAny, getUserInfo } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";

export const FilteredInformation = ({ nameSection }) => {
  const [data, setData] = useState([]);
  const [criteria, setCriteria] = useState("");
  const path = nameSection.slice(0, nameSection.length - 1).toLowerCase();
  const userRdxData = useSelector(userData);
  const navigate = useNavigate()

  const criteriaHandler = (e) => {
    setCriteria(e.target.value);
  };

  useEffect(() => {
    if (criteria !== "") {
      const bringUsers = setTimeout(() => {
        findAllOfAny(userRdxData.credentials.token, path, criteria)
          .then((res) => {
            setData(res.sort());
          })
          .catch((error) => console.log(error));
      }, 375);

      return () => clearTimeout(bringUsers);
    } else {
      findAllOfAny(userRdxData.credentials.token, path, criteria).then(
        (res) => {
          setData(res.sort());
        }
      );
    }
    if(nameSection === "Quotes") {
      setCriteria({
        dateOfQuote: "",
        endOfQuote: ""
      })
    } else {
      setCriteria("")
    }
  }, [criteria, nameSection]);

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

  const removeData = () => {};
  return (
    <div className="body-filterinformation flex-c-c">
      <div className="input-section flex-c-c">
        <p>{nameSection}</p>
        {nameSection === "Quotes" ? 
        <div className="date-info flex-c-c">
        <label className="flex-c-c">
          Since:
          <input type="date" onChange={(e)=>{setCriteria((prev) => ({...prev, dateOfQuote: e.target.value}))}}></input>
        </label>
        <button onClick={()=>setCriteria({
        dateOfQuote: "",
        endOfQuote: ""
      })} className="click">Clear</button>
        <label className="flex-c-c">
          To:
          <input type="date" onChange={(e)=>{setCriteria((prev) => ({...prev, endOfQuote: e.target.value}))}}></input>
        </label>
        </div>:
        <input onChange={(e) => criteriaHandler(e)} name="criteria" type="text"/>}
      </div>
      <div className="filtered-information container">
        {data.length !== 0 &&
          data.map((res) => {
            if (nameSection === "Users") {
              return (
                <>
                  {!res.dni ?
                  <></> :
                <div key={res._id} className="filtered-data flex-c-c">
                  <p>{res.name.charAt(0).toUpperCase() + res.name.slice(1)}</p>
                  <p>{res.dni}</p>
                </div>
                  }
                </>
              );
            }
            if (nameSection === "Quotes") {
              return (
                <>
                  {!res.customer ? (
                    <></>
                  ) : (
                    <div key={res._id} className="filtered-data click" onClick={()=>navigate(`/quote/${res._id}`)}>
                      <span>
                        {res.customer.name.charAt(0).toUpperCase() + res.customer.name.slice(1)} 
                      </span>
                      <span>
                        {formatedDate(res.dateOfQuote)}
                      </span>
                    </div>
                  )}
                </>
              );
            }
            if (nameSection === "Specialities") {
              return (
                <>   
                {!res.price ? <></>:
                <div key={res._id} className="filtered-data">
                  <p>{res.name}</p>
                  <p>{res.price + '€'}</p>
                </div>}
                </>
              );
            }
          })}
      </div>
    </div>
  );
};
