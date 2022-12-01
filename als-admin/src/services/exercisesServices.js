import axios from "./axios";

const GET_EXERCISES_URL = '/exercise/GetAllExercise/';
const DELETE_PEXERCISE_URL = '/exercise/UpdateStatusExercise?id=';
const GET_CATEGORIES_URL = '/CategoryExercise/GetAllCategoryExercise';
const UPDATE_EXERCISE_URL = '/exercise/UpdateInformationExercise';
const CREATE_EXERCISE_URL = '/exercise/CreateNewExcercise';


export const getAllExercisesAsync = async () => {
    return await axios.get(GET_EXERCISES_URL);
}

export const toggleExerciseAsync = async (exerciseId, status) => {
    // console.log(exerciseId);
    // console.log(DELETE_PEXERCISE_URL + exerciseId);
    // console.log(status);
    const exercise = {status: status};
    return await axios.put(DELETE_PEXERCISE_URL + exerciseId, exercise);
}

export const getAllCategoriesAsync = async () => {
    return await axios.get(GET_CATEGORIES_URL);
}

export const updateExerciseAsync = async (exercise) => {
    // console.log(exercise.exerciseId);
    // console.log(UPDATE_EXERCISE_URL);
    return await axios.put(UPDATE_EXERCISE_URL, exercise);
}

export const createExerciseAsync = async (exercise) => {
    // console.log(CREATE_EXERCISE_URL);
    return await axios.post(CREATE_EXERCISE_URL, exercise);
}