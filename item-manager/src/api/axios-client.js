import axios from "axios";
import { BASE_URL } from "../const/uri";

export const getAxiosClient = () => axios.create({
    baseURL: BASE_URL,
    headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
    }
})