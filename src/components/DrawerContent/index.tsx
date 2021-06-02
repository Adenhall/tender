import React from "react";
import { List, ListItem, ListItemText, makeStyles } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles(() => ({
  list: {
    width: 250,
  },
}));

const DrawerContent = () => {
  const classes = useStyles();
  const history = useHistory();
  const { pathname } = useLocation();
  return (
    <List className={classes.list}>
      {[pathname === "/my-types" ? "Dashboard" : "Your types", "Logout"].map(
        (text, i) => (
          <ListItem
            onClick={() =>
              i === 1
                ? history.push("/login")
                : history.push(pathname === "/my-types" ? "/" : "/my-types")
            }
            button
            key={text}
          >
            <ListItemText primary={text} />
          </ListItem>
        )
      )}
    </List>
  );
};

export default DrawerContent;
