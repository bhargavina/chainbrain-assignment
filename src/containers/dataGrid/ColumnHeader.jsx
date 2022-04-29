import { makeStyles } from "@material-ui/core";

const useHeaderStyles = makeStyles(() => ({
  headerContainer: {
    background: "rgba(60, 93, 210, 0.05)",
  },
}));

function ColumnHeader(props) {
  console.log("props: ", props);
  const classes = useHeaderStyles();
  return <div className={classes.headerContainer}>abs</div>;
}

export default ColumnHeader;
