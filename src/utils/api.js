import axios from 'axios';

const api = axios.create({
  baseURL: 'https://certa-palavra.vercel.app/api',
});

export default api;
