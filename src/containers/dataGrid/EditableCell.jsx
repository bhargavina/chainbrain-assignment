import { makeStyles } from "@material-ui/core";

const useEditableCellStyles = makeStyles(() => ({
  editCellContainer: {},
}));

function EditableCell(props) {
  console.log("props: ", props);
  const classes = useEditableCellStyles();
  return (
    <input
      onChange={(e) => {
        console.log("onChange e.target.value: ", e.target.value);
        props.onRowChange(
          { ...props.row, [props.column.key]: e.target.value },
          true
        );
      }}
      onBlur={(e) => {
        console.log("onBlur e.target.value: ", e.target.value);
        props.onRowChange(
          { ...props.row, [props.column.key]: e.target.value },
          true
        );
      }}
      value={props.row[props.column.key]}
    />
  );
}

export default EditableCell;
