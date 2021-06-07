import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000/';

export const loginWithUsername = async (username: string, password: string) => axios.post(`${BACKEND_URL}auth/login`, { username, password }).then((res) => res?.data?.data);

export const signup = () => {};
