import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'process.env.URL_BASE' : 'http://localhost:3000/api',
});

export default api;
