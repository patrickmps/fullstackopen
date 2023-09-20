import axios from 'axios'

const baseURL = `https://api.openweathermap.org/data/2.5`

function get(city) {
  const data = axios.get(`${baseURL}/weather?q=${city}&appid=${import.meta.env.VITE_API_ID}&units=metric`).then(response => response.data)
  return data
}

export default { get }