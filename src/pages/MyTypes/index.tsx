/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getAllLikedUsers } from 'api/users';
import { User } from 'types/user';
import { useAuth } from 'contexts/AuthContext';

import {
  List, ListItem, ListItemAvatar, ListItemText, Avatar,
} from '@material-ui/core';

type MyTypesProps = {
  userDetails: any;
  isLoggedIn: boolean;
};

const MyTypes = () => {
  const history = useHistory();
  const { currentUser: userDetails } = useAuth();
  const [likedUsers, setLikedUsers] = useState<User[]>([]);
  const fetchData = async () => {
    const { data } = userDetails && (await getAllLikedUsers(userDetails?._id));
    console.log(data);
    setLikedUsers(data);
  };
  useEffect(() => {
    if (!userDetails) {
      history.push('/login');
    } else fetchData();
  }, []);
  return (
    <List disablePadding>
      {likedUsers.map((user) => (
        <ListItem key={user._id} style={{ borderBottom: '1px solid brown' }} button>
          <ListItemAvatar>
            <Avatar src={user.pictureUrl} />
          </ListItemAvatar>
          <ListItemText primary={user.name} />
        </ListItem>
      ))}
    </List>
  );
};

export default MyTypes;
