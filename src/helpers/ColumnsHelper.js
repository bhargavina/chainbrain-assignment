import { TextEditor } from "react-data-grid";

export function getDefaultColumns() {
  return [
    { key: "id", name: "ID" },
    { key: "name", name: "Name" },
    { key: "age", name: "Age" },
    { key: "gender", name: "Gender" },
    { key: "phone", name: "Phone" },
  ];
}

export function formatColumns(columns) {
  const formattedColumns = columns.map((item) => {
    if (item.key === "id") {
      return {
        ...item,
        // headerRenderer: (props) => <ColumnHeader {...props} />,
        editable: false,
        resizable: false,
      };
    }
    return {
      ...item,
      editor: TextEditor,
      editorOptions: {
        editOnClick: true,
      },
      editable: true,
      resizable: false,
      sortable: false,
      // frozen: true,
      // headerRenderer: (props) => <ColumnHeader {...props} />,
    };
  });
  return formattedColumns;
}

export function unformatColumns() {}
