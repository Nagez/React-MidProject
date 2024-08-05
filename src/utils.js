import axios from 'axios';

const getAll = (url) => axios.get(url);

const getById = (url, id) => axios.get(`${url}/${id}`);

const getByUserId = (url, id) => axios.get(`${url}?userId=${id}`);

export { getAll, getById, getByUserId };