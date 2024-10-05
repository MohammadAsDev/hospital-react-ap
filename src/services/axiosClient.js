import axios from "axios";
import { api_host } from "config/api_host";
import { encryptData , decryptData } from "config/lib";

const axiosInstance = axios.create({
    baseURL : api_host,
});

async function updateSessionStorage(token) {
    if (sessionStorage.getItem("userInfo")) {
        const userInfo =  JSON.parse(decryptData(sessionStorage.getItem("userInfo")));
        userInfo.token = token;
        sessionStorage.setItem(
            "userInfo",
            encryptData(JSON.stringify(userInfo))
        );
    }
}

async function refreshToken() {
    const userInfo = JSON.parse(decryptData(sessionStorage.getItem("userInfo")));
    const token = userInfo.token;


    const response = await axios.post(`${api_host}/auth/refresh/`, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    updateSessionStorage(response.headers["authorization"]);
    return response.headers["authorization"];   
}

axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        if(error.response && (error.response.status === 401 || error.response.status === 403)) {
            try {
                const authHeader =  await refreshToken();
                
                axios.defaults.headers.common["Authorization"] = authHeader;
                
                const request = error.config;
                request.headers.Authorization = authHeader;

                return axios(request);

            } catch (refreshError) {
                console.log(refreshError);
                return Promise.reject(refreshError)
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance

