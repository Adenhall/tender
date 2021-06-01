import { useEffect, useState, useRef } from "react";
import UserCard from "components/UserCard";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  makeStyles,
  Theme,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import axios from "axios";
import { clamp } from "lodash";
import { User } from "types/user";
import { useGesture } from "react-use-gesture";
import { useSprings, animated } from "react-spring";

const useStyles = makeStyles((theme: Theme) => ({
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

  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const index = useRef(0);
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [props, api] = useSprings(users.length, (i) => ({
    x: i * window.innerWidth,
    sc: 1,
    display: "block",
  }));
  const bind = useGesture({
    onDrag: ({
      down,
      delta: [xDelta],
      distance,
      swipe: [swipeX],
    }) => {
      swipeX !== 0 &&
        (index.current = clamp(index.current - swipeX, 0, users.length - 1));
      // On swipe left
      if (swipeX === -1) {
      }
      // On swipe right
      if (swipeX === 1) {
      }
      api.start((i) => {
        if (i < index.current - 1 || i > index.current + 1)
          return { display: "none" };
        const x = (i - index.current) * window.innerWidth + (down ? xDelta : 0);
        const sc = down ? 1 - distance / window.innerWidth / 2 : 1;
        return { x, sc, display: "block" };
      });
    },
  });
  const fetchData = async (page = 0) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}user?page=${page}&limit=4`,
        {
          headers: {
            "app-id": process.env.REACT_APP_DUMMY_API_KEY,
          },
        }
      );

      setUsers(res?.data?.data);
      setPage(res.data.page);
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
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Tender
          </Typography>
          <Button color="inherit">Useless button</Button>
        </Toolbar>
      </AppBar>
      {loading ? (
        <div>Loading...</div>
      ) : (
        props.map(({ x, display, sc }, i) => (
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
              <UserCard
                name={users[i].firstName}
                id={`${i}`}
                profilePic={users[i].picture || ""}
              />
            </animated.div>
          </animated.div>
        ))
      )}
    </>
  );
};

export default Dashboard;
