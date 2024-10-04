const API_URL = import.meta.env.PROD ? (import.meta.env.VITE_API_URL as string) || '/api' : '/api';

const API = {
  API_URL,
};

export default API;
