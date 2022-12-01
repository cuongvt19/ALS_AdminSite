import axios from "./axios";

const GET_PATIENT_URL = '/user/GetAllPatients/';
const DELETE_PATIENT_URL = '/user/UpdateActiveUser?id='

export const getAllPatientsAsync = async () => {
    return await axios.get(GET_PATIENT_URL);
}

export const deletePatientAsync = async (patientId) => {
    console.log(patientId);
    console.log(DELETE_PATIENT_URL + patientId);
    const patient = {status: false};
    return await axios.put(DELETE_PATIENT_URL + patientId, patient);
}