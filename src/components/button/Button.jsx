import { makeStyles, alpha, Button as MuiButton } from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.secondary.main,
    color: theme.palette.text.secondary,
    textTransform: "none",
    fontSize: "0.75rem",
    padding: "0.5rem 0.75rem",
  },
  contained: {
    "&:hover": {
      background: theme.palette.secondary.main,
    },
  },
  startIcon: {
    marginLeft: 0,
  },
}));

function Button(props) {
  const {
    buttonText = "",
    onClick = () => null,
    variant = "contained",
    ...restProps
  } = props;

  const classes = useStyles();

  return (
    <MuiButton
      classes={{ root: classes.root, startIcon: classes.startIcon, contained: classes.contained }}
      onClick={onClick}
      variant={variant}
      {...restProps}
    >
      {buttonText}
    </MuiButton>
  );
}

Button.propTypes = {
  buttonText: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
