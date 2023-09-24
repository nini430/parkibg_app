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

export default axiosApiInstance;

