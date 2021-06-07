import axios from 'axios';

export const loginWithUsername = async (username: string, password: string) => axios.post(`${process.env.REACT_APP_BACKEND_URL}auth/login`, { username, password }).then((res) => res?.data?.data);

export const signup = () => {};
