import { sendApiRequest } from './api';

export async function sendGetRequest(url) {
  try {
    const response = await sendApiRequest('get', url);
    return response?.data?.Data;
  } catch (err) {
    console.error('error when getting data:', err);
    throw err;
  }
}

export async function sendPostRequest(url, payload, isBlob) {
  try {
    const response = await sendApiRequest(
      'post',
      url,
      payload,
      isBlob && 'blob'
    );
    return response.data;
  } catch (err) {
    console.error('error when posting data:', err);
    throw err;
  }
}
