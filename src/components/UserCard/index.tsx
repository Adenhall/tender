// import { useState } from "react";
import { makeStyles } from "@material-ui/core";
// import FavoriteIcon from "@material-ui/icons/Favorite";
// import ShareIcon from "@material-ui/icons/Share";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles(() => ({
  container: {
    width: "100%",
    height: "100%",
    padding: "1rem",
  },
  header: {
    display: "flex",
    marginBottom: ".3rem",
    "& :last-child": {
      marginLeft: ".3rem",
    },
  },
  actions: {
    position: "relative",
    bottom: "0",
  },
}));

type UserCardProps = {
  id: string;
  name: string;
  age?: number;
  profilePic: string;
  bio?: string;
};

const UserCard: React.FC<UserCardProps> = ({ name, age, profilePic, bio }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div>{name},</div>
        <div>{age}</div>
      </div>
      <div>
        <img alt={name} src={profilePic} />
      </div>
      <div>{bio}</div>
      <div className={classes.actions}>This is action</div>
    </div>
  );
};

export default UserCard;
