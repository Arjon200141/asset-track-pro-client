import axios from "axios";

export const axiosSecure = axios.create({
    baseURL: 'https://assettrack-pro-server.vercel.app'
})

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;