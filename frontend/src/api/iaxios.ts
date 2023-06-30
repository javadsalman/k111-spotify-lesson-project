import axios from 'axios';

const BASE_URL = 
    process.env.NODE_ENV === 'development' 
    ? 'http://127.0.0.1:8000/api' 
    : 'https://customdomain.com'

const iaxios = axios.create({
    baseURL: BASE_URL,
})

export function setTokenToAxiosInstance(token: string) {
    iaxios.defaults.headers.common['Authorization'] = `Token ${token}`
}

export function removeTokenFromAxiosInstance() {
    delete iaxios.defaults.headers.common['Authorization']
}

export default iaxios;