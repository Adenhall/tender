import { useEffect, useState, useRef } from "react";
import UserCard from "components/UserCard";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import { clamp } from "lodash";
import { User } from "types/user";
import { useGesture } from "react-use-gesture";
import { useSprings, animated } from "react-spring";

const useStyles = makeStyles(() => ({
  userCardContainer: {
    width: "100vw",
    height: "100vh",
    position: "absolute",
    willChange: "transform",
    "& > div": {
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
      width: "100%",
      height: "100%",
      willChange: "transform",
      boxShadow:
        "0 62.5px 125px -25px rgba(50, 50, 73, 0.5), 0 37.5px 75px -37.5px rgba(0, 0, 0, 0.6)",
    },
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const index = useRef(0);
  const [users, setUsers] = useState<User[]>([]);
  const [props, set] = useSprings(users.length, (i) => ({
    x: i * window.innerWidth,
    sc: 1,
    display: "block",
  }));
  const bind = useGesture({
    onDrag: ({
      down,
      delta: [xDelta],
      direction: [xDir],
      distance,
      cancel,
      canceled,
    }) => {
      if (down && distance > window.innerWidth / 2) {
        cancel();
      }
      if (canceled)
        index.current = clamp(
          index.current + (xDir > 0 ? -1 : 1),
          0,
          users.length - 1
        );
      set((i) => {
        if (i < index.current - 1 || i > index.current + 1)
          return { display: "none" };
        const x = (i - index.current) * window.innerWidth + (down ? xDelta : 0);
        const sc = down ? 1 - distance / window.innerWidth / 2 : 1;
        return { x, sc, display: "block" };
      });
    },
  });
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}user`, {
        headers: {
          "app-id": process.env.REACT_APP_DUMMY_API_KEY,
        },
      })
      .then((res) => setUsers(res?.data?.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      {props.map(({ x, display, sc }, i) => (
        <animated.div
          {...bind()}
          key={i}
          style={{
            display,
            transform: x.to((x) => `translate3d(${x}px,0,0)`),
          }}
          className={classes.userCardContainer}
        >
          <animated.div
            style={{
              transform: sc.to((s) => `scale(${s})`),
            }}
          >
            <UserCard />
          </animated.div>
        </animated.div>
      ))}
    </>
  );
};

export default Dashboard;
