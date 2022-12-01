import axios from "./axios";
import { FPT_API_KEY } from "../constants/apiKey";

const GET_ADMIN_RECORDS_URL = "/record/GetRecordByUserId?id=";
const DELETE_RECORD_URL = "/record/UpdateStatusRecord?recordId=";
const CREATE_RECORD_URL = "/record/CreateRecord";

export const getAllAdminRecordsAsync = async (userId) => {
  return await axios.get(GET_ADMIN_RECORDS_URL + userId);
};

export const deleteRecordAsync = async (recordId) => {
  return await axios.put(DELETE_RECORD_URL + recordId);
};

export const textToSpeechAsync = async (textValue) => {
  return await axios({
    url: "https://api.fpt.ai/hmi/tts/v5",
    data: textValue,
    method: "post",
    headers: {
      "api-key": FPT_API_KEY,
      voice: "leminh",
    },
  });
};

export const createRecordAsync = async (record) => {
    console.log(record);
    return await axios.post(CREATE_RECORD_URL, record);
  };

// export const updateArticleAsync = async (article) => {
//     return await axios.put(UPDATE_ARTICLE_URL, article);
// }

// export const createArticleAsync = async (article) => {
//     console.log(article);
//     return await axios.post(CREATE_ARTICLE_URL, article);
// }
