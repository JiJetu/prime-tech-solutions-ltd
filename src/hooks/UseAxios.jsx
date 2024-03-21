import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://dummyjson.com'
})
const UseAxios = () => {
    return axiosPublic;
};

export default UseAxios;