import React from "react";
import { List, ListItem, ListItemText, makeStyles } from "@material-ui/core";
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(() => ({
  list: {
    width: 250,
  },
}));

const DrawerContent = () => {
  const classes = useStyles();
  const history = useHistory()
  return (
    <List className={classes.list}>
      {["Your types", "Logout"].map((text, i) => (
        <ListItem onClick={() => i === 1 ? history.push('/login') : history.push('/my-types') } button key={text}>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  );
};

export default DrawerContent;
