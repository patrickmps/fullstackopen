import { useEffect, useState } from 'react';
import axios from 'axios';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange
  };
};

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    getAll();
  }, []);

  const getAll = async () => {
    const response = await axios.get(baseUrl);
    setResources(response.data);
  };

  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource);
    setResources(resources.concat(response.data));
  };

  const service = {
    create
  };

  return [resources, service];
};
