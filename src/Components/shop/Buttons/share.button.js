import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const ShareButton = withStyles({
  root: {
    background: "linear-gradient(45deg, #0769ad 30%, #7acef4 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 40,
    padding: "0 16px",
    boxShadow: "0 3px 5px 2px rgba(236, 229, 221)",
  },
})(Button);

export default ShareButton;
