import axios from "axios"
import { toast } from "sonner"

const axiosInstance = axios.create({
    baseURL : import.meta.env.VITE_API_URL,
    withCredentials:true
})

axiosInstance.interceptors.response.use(
    (response)=> response,
    (error)=> {
        const status = error?.response?.status

        if(status ===401){
            
             window.location.href = "/auth/login";
            
        }
        
    return Promise.reject(error);
    }
)

export default axiosInstance;
