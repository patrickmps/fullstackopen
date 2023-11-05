import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (content) => {
  const id = 100000 * Math.random().toFixed(0);

  const object = {
    content: content,
    id: id,
    votes: 0
  };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  return response.data;
};

export default { getAll, create, update };
