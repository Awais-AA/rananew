import { refreshToken } from '../redux/features/auth/authSlice.js'
import {axiosPrivate} from './axios.js'

const setupInterceptor =async(store) =>{
axiosPrivate.interceptors.request.use(async(config)=>{
    let token= await store.getState().auth?.user.tokens
        if(!(config.headers['Authorization'])){
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config;


 




},(error)=>{
    return Promise.reject(error)
})


axiosPrivate.interceptors.response.use(
    response=>response,
    async(error)=>{
        const config=error.config

        if(error?.response?.status===403 && !(config?.sent)){
            config.sent=true
            await store.dispatch(refreshToken())

            
            const token=await store.getState().auth.user?.tokens
            config.headers['Authorization']=`Bearer ${token}`
            return axiosPrivate(config)
            

        }


        return Promise.reject(error)
    }

)
      return true
}

export default setupInterceptor