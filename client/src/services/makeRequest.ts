// Helper function that will request posts from server

import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true,
});

function makeRequest(url: string, options?: {}) {
  return api(url, options)
    .then((res) => res.data)
    .catch((error) =>
      Promise.reject(error?.response?.data?.message ?? 'Error')
    );
}

export { makeRequest };
