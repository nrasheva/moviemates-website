import axios from 'axios';

const baseURL = 'http://localhost:3000';
const timeout = 10000;

axios.defaults.baseURL = baseURL;
axios.defaults.timeout = timeout;

export { axios };
