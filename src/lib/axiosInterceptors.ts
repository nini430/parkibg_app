import apiRoutes from '@/api/apiRoutes';
import { User } from '@/types/user';
import axios from 'axios'

declare module 'axios' {
    interface AxiosRequestConfig {
        _isRetry:boolean;
    }
}


const axiosApiInstance=axios.create({
    baseURL:'http://localhost:8080/api/v1',
    _isRetry:false
});

axiosApiInstance.interceptors.request.use((request)=>{
    return request;
},(err:any)=>{
    return Promise.reject(err);
});

axiosApiInstance.interceptors.response.use((response)=>{
    const originalRequest=response.config;
    if(originalRequest && originalRequest.url===apiRoutes.auth.login) {
        const {accessToken,refreshToken,user}=response.data as {accessToken:string,refreshToken:string,user:User};
        localStorage.setItem('accessToken',accessToken);
        localStorage.setItem('refreshToken',refreshToken);
        localStorage.setItem('user',JSON.stringify(user));
    }

    return response;
},(err:any)=>{
    return Promise.reject(err);
})

export default axiosApiInstance;

