import axios from 'axios';

const nodeAPI = axios.create({
  baseURL: 'http://localhost:8000/',
});

export default nodeAPI;
