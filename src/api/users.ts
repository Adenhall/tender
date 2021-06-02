import axios from 'axios';

const getAllUsers = (liked: string[], passed: string[], currentUser: string) => axios.post(`${process.env.REACT_APP_BACKEND_URL}users`, { liked, passed, currentUser }).then((res) => res?.data);

const likeUser = (id: string, currentUser: string) => axios.post(`${process.env.REACT_APP_BACKEND_URL}users/like`, { matchId: id, currentUser }).then((res) => res?.data);

const passUser = (id: string, currentUser: string) => axios.post(`${process.env.REACT_APP_BACKEND_URL}users/pass`, { passedId: id, currentUser }).then((res) => res?.data);

const getAllLikedUsers = (currentUser: string) => axios.post(`${process.env.REACT_APP_BACKEND_URL}users/getAllLiked`, { currentUser }).then((res) => res?.data);

export {
  getAllUsers, likeUser, passUser, getAllLikedUsers,
};
