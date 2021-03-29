import axios from 'axios';
import {
    API_URI as baseUrl
} from '../../config.json'

export const get = async (url, params) => {
  try {
    const response = await axios({
      method: 'get',
      url: baseUrl + url,
      params
    });

    return response.data;

  } catch (error) {
    console.error(error);
  }
}

export const post = async (url, data) => {
  try {
    const response = await axios({
      method: 'post',
      url: baseUrl + url,
      data
    });

    return response.data;

  } catch (error) {
    console.error(error);
  }
}

export const put = async (url, data) => {
  try {
    const response = await axios({
      method: 'put',
      url: baseUrl + url,
      data
    });

    return response.data;

  } catch (error) {
    console.error(error);
  }
}
