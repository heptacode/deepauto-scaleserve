import Axios from 'axios';

export const axios = Axios.create();

axios.defaults.baseURL = import.meta.env.VITE_APP_API_BASE_URL;
