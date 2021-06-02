/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllLikedUsers } from 'api/users';
import { User } from 'types/user';

import {
  List, ListItem, ListItemAvatar, ListItemText, Avatar,
} from '@material-ui/core';

type MyTypesProps = {
  userDetails: any;
  isLoggedIn: boolean;
};

const MyTypes = ({ userDetails, isLoggedIn }: MyTypesProps) => {
  const history = useHistory();
  const [likedUsers, setLikedUsers] = useState<User[]>([]);
  const fetchData = async () => {
    const { data } = await getAllLikedUsers(userDetails._id);
    setLikedUsers(data);
  };
  useEffect(() => {
    if (!isLoggedIn) history.push('/login');
    fetchData();
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

const mapStateToProps = (state: any) => ({
  userDetails: state.auth.userDetails,
  isLoggedIn: state.auth.isAuthorized,
});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MyTypes);
