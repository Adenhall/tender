import React, { ReactNode, useState } from 'react';

import { makeStyles, AppBar, Toolbar, IconButton, Typography, Drawer, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import DrawerContent from 'components/DrawerContent';

const useStyles = makeStyles((theme) => ({
  appBar: {
    height: '8.5%',
  },
  title: {
    flexGrow: 1,
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => setDrawerOpen(!drawerOpen)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Tender
          </Typography>
          <Button color="inherit">Useless button</Button>
        </Toolbar>
      </AppBar>
      <Drawer variant="temporary" open={drawerOpen} onClose={() => setDrawerOpen(!drawerOpen)}>
        <DrawerContent />
      </Drawer>
      {children}
    </>
  );
};

export default Layout;
