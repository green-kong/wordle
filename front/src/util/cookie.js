import { Cookies } from 'react-cookie';
import axios from 'axios';

const cookies = new Cookies();

export async function checkCookie() {
  const token = cookies.get('Access_token');
  if (!token) {
    return false;
  }
  const reqUrl = 'http://localhost:4000/api/user/login';
  const body = { token };

  const { data } = await axios.post(reqUrl, body);
  return data;
}

export function clearCookie() {
  cookies.remove('Access_token');
}
