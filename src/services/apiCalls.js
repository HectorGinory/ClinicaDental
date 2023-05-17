import axios from 'axios';
import jwt_decode from 'jwt-decode';

// const url = 'https://dentistclinicbackend-production.up.railway.app/'
const url = 'http://localhost:3000/'
const config = (token) => {
    const config = {
        headers: { 
          "authorization": `Bearer ${token}`,  
        }
    };
    return config
}

export const logInUsers = async (credentials) => {
    const res = await axios.post(`${url}user/login`, credentials)
    const data = {
        credentials: {
            "token": res.data.token,
            "user": jwt_decode(res.data.token)
        }
    }
    return data
}

export const registerUsers = async (credentials) => {
    await axios.post(`${url}user`,credentials)
    const login = {
        "email": credentials.email,
        "password": credentials.password
    }
    return await logInUsers(login)
}


export const getUserInfo = async(id, token) => {
    const res = await axios.get(`${url}user/${id}`, config(token))
    return res.data
}

export const updateUserId = async(id,credentials, token) => {
    const res = await axios.put(`${url}user/${id}`, credentials , config(token))
    return res.data
}

export const findAllOfAny = async(token, path, criteria) => {
    if(criteria !== "") {
        if(path !== "quote") {
            const res =  await axios.get(`${url}${path}?name=${criteria}`, config(token))
            return res.data
        } else {
            const res =  await axios.get(`${url}${path}`, config(token))
            return res.data
        }
    } else {
        const res = await axios.get(`${url}${path}`, config(token))
        return res.data
    }
}

export const deleteAny = async(token, path, id) => {
    const res = await axios.delete(`${url}${path}/${id}`, config(token))
    return res.data
}

export const createNewQuote = async(token, credentials) => {
    const res = await axios.post(`${url}quote`, credentials, config(token))
    return res.data
}

export const getQuoteId = async(token, id) => {
    const res = await axios.get(`${url}quote/${id}`, config(token))
    return res.data
}

export const uploadQuoteById = async(token, id, credentials) => {
    const res = await axios.patch(`${url}quote/${id}`,credentials, config(token))
    return res.data
}