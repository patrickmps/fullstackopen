import axios from 'axios'

const baseURL = 'https://restcountries.com/v3.1'

function getAll() {
  const data = axios.get(`${baseURL}/all`).then(response => response.data)
  return data
}

export default { getAll }