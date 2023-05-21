import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import { userData } from '../userSlice';
import { FilteredInformation } from '../../common/FilteredInformation/FilteredInformation';
import { useNavigate } from 'react-router-dom';
import './Admin.css'
export const Admin = () => {
    const [section, setSection] = useState('Users');
    const navigate = useNavigate()
    const userRdxData = useSelector(userData)

    useEffect(()=> {
        if(userRdxData.credentials.user.rol !== "Admin") {
            navigate("/")
        } 
    },[])
  return (
    <div>
        <div className='database-controller container flex-c-c'>
            <div className='nav-sections flex-c-c'>
                <button onClick={()=>setSection('Users')}>Users</button>
                <button onClick={()=>setSection('Quotes')}>Quotes</button>
                <button onClick={()=>setSection('Specialities')}>Specialities</button>
            </div>
            <div className='database-sections container flex-c-c'>
                <FilteredInformation nameSection={section} />
            </div>
        </div>
    </div>
  )
}
