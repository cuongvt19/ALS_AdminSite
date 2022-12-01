import axios from "./axios";

const GET_STAFFS_URL = '/user/GetAllStaffs/';
const DELETE_STAFF_URL = '/user/UpdateActiveUser?id=';
const CREATE_STAFF_URL = '/user/CreateAccountStaff';

export const getAllStaffsAsync = async () => {
    return await axios.get(GET_STAFFS_URL);
}

export const toggleStaffStatusAsync = async (staffId, status) => {
    console.log(staffId);
    console.log(DELETE_STAFF_URL + staffId);
    console.log(status);
    const staff = {
        status: status
    }
    return await axios.put(DELETE_STAFF_URL + staffId, staff);
}

export const createStaffAsync = async (staff) => {
    // console.log(CREATE_EXERCISE_URL);
    return await axios.post(CREATE_STAFF_URL, staff);
}