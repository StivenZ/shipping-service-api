import axios, { AxiosRequestConfig } from 'axios';
import config from '../../config';

async function postRequest(body: Object, url: string) {
  const request: AxiosRequestConfig = {
    // eslint-disable-next-line no-underscore-dangle
    url: `${config._99minutos.apiUrl}${url}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // eslint-disable-next-line no-underscore-dangle
      Authorization: `Bearer ${config._99minutos.apiKey}`
    },
    data: body
  };

  const response = await axios.request(request);
  console.log(response.data, '-----This is the client-----');

  return response.data;
}

async function getRequest(url: string) {
  const request: AxiosRequestConfig = {
    // eslint-disable-next-line no-underscore-dangle
    url: `${config._99minutos.apiUrl}${url}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // eslint-disable-next-line no-underscore-dangle
      Authorization: `Bearer ${config._99minutos.apiKey}`
    }
  };
  const response = await axios.request(request);
  
  return response.data;
}

export default {
  getRequest,
  postRequest
};
