import axios from 'axios';

const request = axios.create({
    baseURL: 'https://api.github.com/',
});

export const get = async (path, options = {}) => {
    const response = await request.get(path, options);
    return response.data;
};

export default request;
