import { withStyles, Button } from "@material-ui/core";

const Mainbutton = withStyles({
  root: {
    background: "linear-gradient(45deg, #fb0404 30%, #fb0529 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 55,
    padding: "0 16px",
    boxShadow: "0 3px 5px 2px rgba(236, 229, 221)",
  },
})(Button);

export default Mainbutton;
