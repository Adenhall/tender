import { useState } from "react";
import { makeStyles } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles(() => ({
  container: {
    width: "100%",
    height: "100%",
  },
}));

const UserCard = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div>This is the header</div>
      <div>This is the picture</div>
      <div>This is info</div>
      <div>This is action</div>
    </div>
  );
};

export default UserCard;
