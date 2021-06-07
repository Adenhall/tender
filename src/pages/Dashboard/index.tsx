/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
import React, { useEffect, useState, useRef } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import UserCard from 'components/UserCard';
import { Backdrop, makeStyles } from '@material-ui/core';
import axios from 'axios';
import { clamp } from 'lodash';
import { User } from 'types/user';
import { useDrag } from 'react-use-gesture';
import { useSprings, animated } from 'react-spring';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { likeUser, passUser } from 'api/users';
import { useAuth } from 'contexts/AuthContext';

const useStyles = makeStyles((theme) => ({
  userCardContainer: {
    width: '100vw',
    /** Corresponds with the appBar */
    height: '91.5%',
    position: 'absolute',
    willChange: 'transform',
    '& > div': {
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      width: '100%',
      height: '100%',
      willChange: 'transform',
      boxShadow: '0 62.5px 125px -25px rgba(50, 50, 73, 0.5), 0 37.5px 75px -37.5px rgba(0, 0, 0, 0.6)',
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

type DashboardProps = {};

const Dashboard = () => {
  const classes = useStyles();
  const index = useRef(0);
  const history = useHistory();
  const { currentUser: userDetails, setUserDetails } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  /** Get list of users based on who the current user has liked or passed */
  const fetchData = async (page = 0) => {
    setLoading(true);
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}users`, { liked: userDetails?.liked, passed: userDetails?.passed, currentUser: userDetails?._id });

      setUsers(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const [springProps, api] = useSprings(users.length, (i) => ({
    x: i * window.innerWidth,
    sc: 1,
    display: 'block',
  }));

  const handleBackdropClose = () => {
    // TO DO: Not sure what feature to do here
  };

  /** Activate when user does a like event */
  const handleLike = async (id: string) => {
    setLoading(true);
    const res = userDetails && (await likeUser(id, userDetails._id));
    setUserDetails(res.data);

    toast.success(res?.message, {
      autoClose: 1500,
    });
    index.current = clamp(index.current + 1, 0, users.length - 1);
    setLoading(false);
  };

  /** Activate when user does a pass event */
  const handlePass = async (id: string, dir = 0) => {
    toast.error('Nahhhh keep looking', {
      autoClose: 1500,
    });
    const res = userDetails && (await passUser(id, userDetails._id));

    setUserDetails(res?.data);
    await fetchData();
    index.current = clamp(index.current + dir, 0, users.length - 1);
  };

  /** Enable draggin and swiping */

  const bind = useDrag(({
    down, delta: [xDelta], distance, swipe: [swipeX],
  }) => {
    // On swipe left
    if (swipeX === -1) {
      index.current = clamp(index.current - swipeX, 0, users.length - 1);
      handlePass(users[index.current - 1]?._id);
    }
    // On swipe right
    if (swipeX === 1) {
      handleLike(users[index.current]?._id);
    }
    api.start((i) => {
      if (i < index.current - 1 || i > index.current + 1) {
        return { display: 'none' };
      }
      const x = (i - index.current) * window.innerWidth + (down ? xDelta : 0);
      const sc = down ? 1 - distance / window.innerWidth / 2 : 1;
      return { x, sc, display: 'block' };
    });
  });

  useEffect(() => {
    userDetails && fetchData();
  }, []);
  return (
    <>
      {loading ? (
        <Backdrop className={classes.backdrop} open={loading} onClick={handleBackdropClose}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        springProps.map(({ x, display, sc }, i) => (
          <animated.div
            {...bind()}
            key={users[i]._id}
            style={{
              display,
              transform: x.to((px) => `translate3d(${px}px,0,0)`),
            }}
            className={classes.userCardContainer}
          >
            <animated.div
              style={{
                transform: sc.to((s) => `scale(${s})`),
              }}
            >
              <UserCard name={users[i].name} id={users[i]._id} profilePic={users[i].pictureUrl || ''} bio={users[i].bio} age={users[i].age} handleLike={handleLike} handlePass={handlePass} />
            </animated.div>
          </animated.div>
        ))
      )}
    </>
  );
};

export default Dashboard;
