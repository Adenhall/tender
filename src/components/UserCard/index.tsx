import React from 'react';
import { makeStyles, IconButton } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CloseIcon from '@material-ui/icons/Close';
// import ShareIcon from "@material-ui/icons/Share";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
    height: '100%',
    padding: '1rem',
  },
  header: {
    display: 'flex',
    marginBottom: '.3rem',
    '& :last-child': {
      marginLeft: '.3rem',
    },
  },
  mediaContainer: {
    '& img': {
      width: '8rem',
    },
  },
  biography: {
    marginTop: '6rem',
    height: '300px',
    width: '80%',
    overflowY: 'auto',
    wordBreak: 'break-all',
  },
  actions: {
    display: 'flex',
    position: 'absolute',
    bottom: '0',
  },
}));

type UserCardProps = {
  id: string;
  name: string;
  age?: number;
  profilePic: string;
  bio?: string;
  handleLike: (id: string) => void;
  handlePass: (id: string, dir?: number) => void;
};

const UserCard: React.FC<UserCardProps> = ({
  name, age = 0, profilePic, bio, handleLike, handlePass, id,
}: UserCardProps) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div>
          {name}
          ,
        </div>
        <div>{age}</div>
      </div>
      <div className={classes.mediaContainer}>
        <img alt={name} src={profilePic} />
      </div>
      <div className={classes.biography}>{bio || 'This one does not have any info or lame pick-up lines. Boringggg'}</div>
      <div className={classes.actions}>
        <IconButton onClick={() => handleLike(id)}>
          <FavoriteIcon />
        </IconButton>
        <IconButton onClick={() => handlePass(id, 1)}>
          <CloseIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default UserCard;
