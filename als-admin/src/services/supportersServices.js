import axios from "./axios";

const GET_SUPPORTER_URL = '/user/GetAllSupporters/';
const DELETE_SUPPORTER_URL = '/user/UpdateActiveUser?id='

export const getAllSupportersAsync = async () => {
    return await axios.get(GET_SUPPORTER_URL);
}

export const toggleStatusSupporterAsync = async (supporterId, status) => {
    // console.log(supporterId);
    // console.log(DELETE_SUPPORTER_URL + supporterId);
    const supporter = {status: status};
    return await axios.put(DELETE_SUPPORTER_URL + supporterId, supporter);
}