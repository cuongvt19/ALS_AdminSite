import axios from "./axios";

const GET_POSTS_URL = '/post/GetAllPostMobile?userId=';
const UPDATE_ARTICLE_URL = '/News/UpdateNews';
const CREATE_ARTICLE_URL = '/News/CreateNewNews';
const TOGGLE_POST_URL = '/post/UpdateIsPublicPost';


export const getAllPostAsync = async (userId) => {
    return await axios.get(GET_POSTS_URL + userId);
}

export const togglePostStatusAsync = async (post) => {
    // console.log(articleId);
    // console.log(DELETE_PEXERCISE_URL + articleId);
    // console.log(status);
    console.log(post);
    return await axios.put(TOGGLE_POST_URL, post);
}

export const updateArticleAsync = async (article) => {
    // console.log(article.articleId);
    // console.log(UPDATE_article_URL);
    return await axios.put(UPDATE_ARTICLE_URL, article);
}

export const createArticleAsync = async (article) => {
    // console.log(CREATE_EXERCISE_URL);
    console.log(article);
    return await axios.post(CREATE_ARTICLE_URL, article);
}