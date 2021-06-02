/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
import React, { useEffect, useState, useRef } from 'react';

import UserCard from 'components/UserCard';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import { clamp } from 'lodash';
import { User } from 'types/user';
import { useDrag } from 'react-use-gesture';
import { useSprings, animated } from 'react-spring';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles(() => ({
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
}));

const Dashboard = () => {
  const classes = useStyles();
  const index = useRef(0);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [springProps, api] = useSprings(users.length, (i) => ({
    x: i * window.innerWidth,
    sc: 1,
    display: 'block',
  }));

  const handleLike = (id: string) => {
    toast.success(id, {
      autoClose: 1500,
    });
  };

  const handlePass = (id: string, dir = 0) => {
    index.current = clamp(index.current + dir, 0, users.length - 1);
    toast.error('Nahhhh keep looking', {
      autoClose: 1500,
    });
  };

  const bind = useDrag(({
    down, delta: [xDelta], distance, swipe: [swipeX],
  }) => {
    swipeX !== 0 && (index.current = clamp(index.current - swipeX, 0, users.length - 1));
    // On swipe left
    if (swipeX === -1) {
      handlePass(users[index.current]?.id);
    }
    // On swipe right
    if (swipeX === 1) {
      // handleLike(users[index.current]?.id)
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
  const fetchData = async (page = 0) => {
    setLoading(true);
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}user?page=${page}&limit=4`, {
        headers: {
          'app-id': process.env.REACT_APP_DUMMY_API_KEY,
        },
      });

      setUsers(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        springProps.map(({ x, display, sc }, i) => (
          <animated.div
            {...bind()}
            key="a"
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
              <UserCard name={users[i].firstName} id={users[i].id} profilePic={users[i].picture || ''} handleLike={handleLike} handlePass={handlePass} />
            </animated.div>
          </animated.div>
        ))
      )}

      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </>
  );
};

export default Dashboard;
