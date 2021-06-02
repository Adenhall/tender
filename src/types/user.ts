export type User = {
  _id: string;
  name: string;
  age?: string;
  pictureUrl?: string;
  bio?: string;
  username: string;
  password: string;
  liked: string[];
  passed: string[];
  match: string[];
  token: string;
};
