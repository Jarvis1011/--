import axios from 'axios';

export async function sendApiRequest(method, url, payload, responseType) {
  const settings = {
    method: method,
    url: (process.env.NEXT_PUBLIC_URL ?? '') + url,
  };

  if (payload) settings.data = JSON.stringify(payload);
  settings.headers = {
    'Content-Type': 'application/json',
  };
  if (responseType) settings.responseType = responseType;

  try {
    const res = await axios(settings);
    return res;
  } catch (err) {
    if (err?.response?.data) {
      console.error('error when calling api:', err?.response?.data);
      return err?.response?.data;
    } else {
      console.error('error when calling api:', err);
      if (err?.response?.status == 403) {
        logoutUser();
      } else {
        return err?.response;
      }
    }
    throw err;
  }
}
