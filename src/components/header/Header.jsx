import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Avatar,
  alpha,
} from "@material-ui/core";
import fontWeights from "../../theme/FontWeights";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  appbarRoot: {
    background: theme.palette.background.default,
    padding: '0 2rem',
  },
  toolbarContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  elevation: {
    "& .MuiPaper-elevation4": {
      boxShadow: `0px 2px 4px -1px ${alpha(
        theme.palette.background.default,
        0.2
      )}, 0px 4px 5px 0px ${alpha(
        theme.palette.background.default,
        0.14
      )}, 0px 1px 10px 0px ${alpha(theme.palette.background.default, 0.12)}`,
    },
  },
  headerLabel: {
    color: theme.palette.secondary.main,
    fontWeight: fontWeights[700],
    fontSize: "1.5rem",
  },
  avatarContainer: {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  avatarDefaultColor: {
    background: alpha(theme.palette.secondary.main, 0.2),
    color: theme.palette.secondary.main,
    fontWeight: fontWeights[700],
    fontSize: "0.875rem",
  },
}));

function Header(props) {
  const { userAvatar, title } = props;
  const classes = useStyles();

  return (
    <AppBar
      position="static"
      classes={{ root: classes.appbarRoot }}
      className={classes.elevation}
    >
      <Toolbar disableGutters>
        <div className={classes.toolbarContainer}>
          <div>
            <Typography
              classes={{
                root: classes.headerLabel,
                elevation4: classes.appbarPaperElevation,
              }}
              variant="h1"
              component="div"
            >
              {title}
            </Typography>
          </div>
          <div className={classes.avatarContainer}>
            <Avatar
              classes={{ colorDefault: classes.avatarDefaultColor }}
              alt={userAvatar}
            >
              {userAvatar}
            </Avatar>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  userAvatar: PropTypes.string,
  title: PropTypes.string,
};

export default Header;
