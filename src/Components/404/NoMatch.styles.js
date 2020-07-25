import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    width: "30%",
    height: "30%"
  },
  noRoute: {
    marginRight: theme.spacing(2),
    marginLeft: "14px",
    marginBottom: '50px',
  }
}));

export default useStyles;
