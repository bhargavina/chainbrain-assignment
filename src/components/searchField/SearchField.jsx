import {
  makeStyles,
  alpha,
  TextField,
  InputAdornment,
  Icon,
} from "@material-ui/core";
import PropTypes from "prop-types";
import messages from "../../constants/Messages";
import { ReactComponent as SearchIcon } from "../../assets/images/searchIcon.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
    borderRadius: "0.25rem",
    fontSize: "0.75rem",
    padding: "0.25rem 0.5rem",
    minHeight: "1rem",
  },
  inputRoot: {
    "& .MuiInputBase-input": {
      padding: 0,
      fontSize: "0.75rem",
    },
  },
  inputAdornmentPositionEnd: {
    marginLeft: 0,
  },
  iconRoot: {
    padding: 0,
    width: "0.875rem",
    height: "0.875rem",
    overflow: "unset",
  },
}));

function SearchField(props) {
  const {
    value = "",
    onChange = () => null,
    placeholder = messages["SearchField.defaultPlaceholder"],
    ...restProps
  } = props;

  const classes = useStyles();

  return (
    <TextField
      classes={{ root: classes.root }}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoComplete="off"
      InputProps={{
        endAdornment: (
          <InputAdornment
            position="end"
            classes={{ positionEnd: classes.inputAdornmentPositionEnd }}
          >
            <Icon classes={{ root: classes.iconRoot }}>
              <SearchIcon width={16} height={16} />
            </Icon>
          </InputAdornment>
        ),
        disableUnderline: true,
        classes: { root: classes.inputRoot },
      }}
      fullWidth
      {...restProps}
    />
  );
}

SearchField.propTypes = {
  value: PropTypes.string,
};

export default SearchField;
