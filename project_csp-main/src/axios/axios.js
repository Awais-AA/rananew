import axios from 'axios'

// {For simple request to backend server}
export default axios.create({
    baseURL:'http://127.0.0.1:8000',
    
    headers:
    {
        'Content-Type':'application/json'
    },
    withCredentials:true
})



// {For admin request to backend server including Token }

export const axiosPrivate = axios.create({
    baseURL:'http://127.0.0.1:8000',
    
    headers:
    {
        'Content-Type':'application/json'
    },
    withCredentials:true,
})
