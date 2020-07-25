import React, { useContext, useState, Fragment } from "react";

import logo from "./question.png";

import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Link,
  useTheme,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Drawer,
} from "@material-ui/core";

import { Link as RouterLink } from "react-router-dom";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  InboxIcon,
  MenuIcon,
  DraftsIcon,
} from "../shop/icons";

import useStyles from "./Toolbar.styles";

import AvatarComponent from "../avatar/AvatarComponent";

import shopcontext from "../../context/ShopContext";

import LoginLogout from "./login-logout-button/loginLogout";

import Loading from "../loading/Loading";

import AdminBar from "../Dashboard/menu/adminbar";

const LinkBehavior = React.forwardRef((props, ref) => (
  <RouterLink ref={ref} to="/" {...props} />
));

export default function MenuNav() {
  const classes = useStyles();

  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const { user } = useContext(shopcontext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

  return (
    <div className={classes.root}>
      <AppBar>
        <Loading />
        {user ? <AdminBar /> : <Fragment />}

        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            onClick={handleDrawerOpen}
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>

          <Box className={classes.container}>
            <Box className={classes.logo} component="span" m={1}>
              <Link component={LinkBehavior}>
                <img alt="my logo" className={classes.imgFluid} src={logo} />
              </Link>
            </Box>
          </Box>

          <div className={classes.endMenuArea}>
            <LoginLogout />
          </div>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <List component="nav" aria-label="main mailbox folders">
          <ListItem className={classes.userAvatar}>
            {user ? (
              <AvatarComponent name={user.username} />
            ) : (
              <AvatarComponent />
            )}
          </ListItem>
          <ListItemLink href="google.com">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItemLink>

          <ListItem button>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItem>
        </List>
        <List component="nav" aria-label="secondary mailbox folders">
          <ListItemLink href="/dashboard">
            <ListItemText primary="dashboard" />
          </ListItemLink>
        </List>
      </Drawer>
    </div>
  );
}
