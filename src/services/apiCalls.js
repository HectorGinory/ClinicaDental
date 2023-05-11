import axios from 'axios';
import jwt_decode from 'jwt-decode';

export const logInUsers = async (credentials) => {
    const res = await axios.post('https://dentistclinicbackend-production.up.railway.app/user/login', credentials)
    const data = {
        credentials: {
            "token": res.data.token,
            "user": jwt_decode(res.data.token)
        }
    }
    return data
}

// let config = {
//     headers: { 
//       'Authorization': 'Bearer '+ token,  
//     }
// };