import axios from "axios";
import req1 from "./req1.json";
import req2 from "./req2.json";

axios.defaults.headers.common['Accept-Version'] = "v1";
axios.defaults.headers.common['Authorization'] = "Client-ID lfIQPljaXW0dEXzji9kJ3feXPerpuorPvrqOXaBX5wk";

export const requestImagesByQuery = async ({ page, query }) => {
    const { data } = await axios.get(
        `https://api.unsplash.com/search/photos?page=${page}&per_page=12&query=${query}`
    );
    return data;
};

export const requestImagesByQueryTest = async ({ page, query }) => {
    if (page % 10 == 0) {
        req1.total_pages = 10
        return req1;
    }
    if (page % 2 != 0) {
        return req1;
    } else {
        return req2;
    }
};

export const requestImageByIdTest = async ({ id }) => {
    return req1.results[id];
};

export const requestImageById = async ({ id }) => {
    const { data } = await axios.get(
        `https://api.unsplash.com/search/photos/${id}`
    );
    return data;
};