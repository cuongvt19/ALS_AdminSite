import axios from "./axios";

const GET_SESSIONS_URL = '/exercise/GetSessionByUserId?userId=';
const GET_SESSIONDETAIL_URL = 'exercise/GetSessionDetailBySessionId?sessionId=';
const DELETE_SESSION_URL = '/exercise/DeleteSessionBySessionId?sessionId=';
const CREATE_SESSION_URL = '/exercise/AddSessionAndSessionDetail';


export const getAllSessionAsync = async (userId) => {
    return await axios.get(GET_SESSIONS_URL + userId);
}

export const getSessionDetailAsync = async (sessionId) => {
    return await axios.get(GET_SESSIONDETAIL_URL + sessionId);
}

export const deleteSessionAsync = async (sessionId) => {
    return await axios.delete(DELETE_SESSION_URL + sessionId);
}

export const createSessionAsync = async (session) => {
    console.log(session);
    return await axios.post(CREATE_SESSION_URL, session);
}