import axios from "./axios";

const GET_ARTICLES_URL = '/News/GetAllNews/';
const DELETE_ARTICLE_URL = '/News/UpdateNewsStatus?newsId=';
const UPDATE_ARTICLE_URL = '/News/UpdateNews';
const CREATE_ARTICLE_URL = '/News/CreateNewNews';


export const getAllArticlesAsync = async () => {
    return await axios.get(GET_ARTICLES_URL);
}

export const deleteArticleAsync = async (articleId, status) => {
    // console.log(articleId);
    // console.log(DELETE_PEXERCISE_URL + articleId);
    // console.log(status);
    return await axios.put(DELETE_ARTICLE_URL + articleId, status);
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