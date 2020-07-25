import { makeStyles } from "@material-ui/core/styles";

const GlobalStyles = makeStyles((theme) => ({
  root: {
    flexWrap: 'wrap',
    minHeight: "800px",
    marginTop: "108px",
  },
  global: {
  },
  Link: {
    marginLeft: "8px",
    marginRight: "8px",
    color: "#000",
    transition: "0.3s",
    cursor: 'pointer',

    "&:hover": {
      color: "#f1f",
      textDecoration: "none",
    },
  },
}));

export default GlobalStyles;
