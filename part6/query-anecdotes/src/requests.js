import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

export const getAll = () => axios.get(baseUrl).then((res) => res.data);

export const create = (object) => {
  axios.post(baseUrl, object).then((res) => res.data);
};

export const update = (updated) =>
  axios.put(`${baseUrl}/${updated.id}`, updated).then((res) => res.data);
