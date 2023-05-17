import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import { userData } from '../userSlice';
import { FilteredInformation } from '../../common/FilteredInformation/FilteredInformation';
import { useNavigate } from 'react-router-dom';

export const Admin = () => {
    const [section, setSection] = useState('Users');
    const navigate = useNavigate()
    const userRdxData = useSelector(userData)

    useEffect(()=> {
        console.log(userRdxData);
        if(userRdxData.credentials.user.rol !== "Admin") {
            navigate("/")
        } 
    },[])
  return (
    <div>
        <div className='database-controller'>
            <div className='nav-sections'>
                <button onClick={()=>setSection('Users')}>Users</button>
                <button onClick={()=>setSection('Quotes')}>Quotes</button>
                <button onClick={()=>setSection('Specialities')}>Specialities</button>
            </div>
            <div className='database-sections'>
                <FilteredInformation nameSection={section} />
            </div>
        </div>
    </div>
  )
}
