import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const InstagramButton = withStyles({
  root: {
    background: "linear-gradient(45deg, #c13584 30%, #e1306c 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 40,
    padding: "0 16px",
    boxShadow: "0 3px 5px 2px rgba(236, 229, 221)",
  },
})(Button);

export default InstagramButton;
