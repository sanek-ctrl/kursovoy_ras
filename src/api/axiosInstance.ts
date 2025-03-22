import axios from 'axios';

export const AxiosInstance = (accessToken: string = '') => {
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:5000',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'true',
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const axiosGet = async (url: string = '', params: object = {}) => {
        const response = await axiosInstance.get(url, { params }); 
        return response.data;
    }

    const axiosPost = async (url: string = '', data: object = {}) => {
        const response = await axiosInstance.post(url, data);
        return response.data;
    }

    const axiosPut = async (url: string = '', data: object = {}) => {
        const response = await axiosInstance.put(url, data);
        return response.data;
    }
    const axiosPatch = async (url: string = '', data: object = {}) => {
        const response = await axiosInstance.patch(url, data);
        return response.data;
    }
    
    const axiosDelete = async (url: string, config?: any) => {
        const response = await axiosInstance.delete(url, config); 
        return response.data;
    };
    
    return {
        axiosGet,
        axiosPost,
        axiosPut,
        axiosPatch,
        axiosDelete
    }
}