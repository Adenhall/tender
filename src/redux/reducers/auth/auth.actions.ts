import { LOGIN, LOGOUT } from './auth.types';

export const login = (payload: any) => ({ type: LOGIN, payload });
export const logout = () => ({ type: LOGOUT });
