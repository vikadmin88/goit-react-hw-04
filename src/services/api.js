import axios from "axios";

axios.defaults.baseURL = 'https://api.unsplash.com';
axios.defaults.headers.common['Accept-Version'] = "v1";
axios.defaults.headers.common['Authorization'] = "Client-ID lfIQPljaXW0dEXzji9kJ3feXPerpuorPvrqOXaBX5wk";

export const requestImagesByQuery = async ({ page, query, perPage }) => {
    const { data } = await axios.get(
        `/search/photos?page=${page}&per_page=${perPage}&query=${query}`
    );
    return data;
};



