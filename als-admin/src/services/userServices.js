import axios from "./axios";

const LOGIN_URL = '/user/LoginUserWeb';

export const loginAuthAsync = async (data) => {
    return await axios.post(LOGIN_URL, data);
}