import axios from "axios";

const api = axios.create({ baseURL: 'https://localhost:44352' })

export default api;