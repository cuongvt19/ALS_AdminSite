import axios from "axios";
import queryString from 'query-string';

export default axios.create({
    baseURL: 'https://als.cosplane.asia/api',
    // paramsSerializer: params => queryString.stringify(params),
});