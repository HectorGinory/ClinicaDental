import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { userData } from '../../pages/userSlice'
import { findAllOfAny, getUserInfo } from '../../services/apiCalls'

export const FilteredInformation = ({nameSection}) => {
    const [data, setData] = useState([])
    const [criteria, setCriteria] = useState("")
    const path = nameSection.slice(0, nameSection.length-1).toLowerCase()
    const userRdxData = useSelector(userData)


    const criteriaHandler = (e) => {
      setCriteria(e.target.value);
    };

    useEffect(() => {
      if(criteria !== "") {
        const bringUsers = setTimeout(() => {
          findAllOfAny(userRdxData.credentials.token, path, criteria)
            .then((searchResults) => {
              setData(searchResults);
            })
            .catch((error) => console.log(error));
        }, 375);
  
        return () => clearTimeout(bringUsers);
      } else {
        findAllOfAny(userRdxData.credentials.token, path, criteria).then(res =>{
          console.log(res)
          setData(res)
      })
      }

    }, [criteria, nameSection]);
    
    const removeData = () => {

    }
  return (
    <div>
        <p>{nameSection}</p>
        <input onChange={(e)=>criteriaHandler(e)} name='criteria' type='text'/>
        <div className='filtered-information'>
        {data.length !== 0 && 
          data.map((res)=> {

            if (nameSection === "Users") {
            return (
              <>
                <p key={res._id}>{res.name} - {res.dni}</p>
              </>
            )
          }
          if (nameSection === "Quotes") {
            return (
              <>
                <p key={res._id}>{res.customer.name}</p>
              </>
            )
          }
          if (nameSection === "Specialities") {
            return (
              <>
                <p key={res._id}>{res.name}</p>
              </>
            )
          }
          }
          )}
        </div>
    </div>
  )
}
