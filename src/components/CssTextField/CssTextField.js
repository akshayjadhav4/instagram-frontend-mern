import { withStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

export const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#a3b6c1",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#a3b6c1",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#a3b6c1",
      },
      "&:hover fieldset": {
        borderColor: "black",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#abb5bb",
      },
    },
  },
})(TextField);
