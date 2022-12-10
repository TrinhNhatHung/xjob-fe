import axios from "axios";
import queryString from 'query-string';

const axiosClient = axios.create({
  baseURL: "http://xjobapi-env.eba-yubniifx.us-east-2.elasticbeanstalk.com",
  headers: {
    'content-type': 'application/json'
  },
  paramsSerializer: params => queryString.stringify(params)
});

axiosClient.interceptors.response.use((response) => {
  if (response && response.data) {
    return response.data;
  }

  return response;
}, (error) => {
  // Handle errors
  throw error;
});

export default axiosClient;