import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 275;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    backgroundColor: '#fb0404',
    height: "80px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
  },
  logo: {
    width: "30px",
    height: "35px",
    [theme.breakpoints.up("sm")]: {
      width: "75px",
      height: "70px",
    },
  },
  imgFluid: {
    width: "100%",
    height: "100%",
  },
  container: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
  },
  link: {
    margin: "2px 2px",
    textDecoration: "none",
    transition: "0.3s",
    [theme.breakpoints.up("sm")]: {
      margin: "2px 10px",
      textDecoration: "none",
    },
    "&:hover": {
      textDecoration: "none",
      color: "red",
    },
  },
  endMenuArea: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      height: "100%",
      alignItems: "center",
      alignContent: "center",
    },
  },
  register: {
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    cursor: "pointer", 
  },
  linkregister: {
    transition: "0.3s ease",
    margin: "2px 10px",
    color: "#000",
    cursor: "pointer", 

    "&:hover": {
      textDecoration: "none",
      color: "blue",
    },
  },
  menuButton: {
    color: "red",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
    marginRight: theme.spacing(2),
  },
  navbar: {
    flexGrow: 1,
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    paddingTop: '32px',
    width: drawerWidth,
  },
  userAvatar: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  }
}));

export default useStyles;
