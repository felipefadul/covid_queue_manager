import axios from 'axios'

const api = axios.create({
  baseURL: `http://${process.env.REACT_APP_HOST || 'localhost'}:3333`,
})

export default api
