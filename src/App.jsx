import { useEffect, useReducer, useState } from "react";
import {
  alpha,
  Drawer,
  makeStyles,
  Paper,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import Header from "./components/header/Header";
import messages from "./constants/Messages";
import theme from "./theme/Theme";
import colors from "./theme/Colors";
import fontWeights from "./theme/FontWeights";
import SearchField from "./components/searchField/SearchField";
import Button from "./components/button/Button";
import DataGrid from "react-data-grid";
import { ReactComponent as HistoryIcon } from "./assets/images/clockIcon.svg";
import { localStorageKeys } from "./constants/Constants";
import { formatColumns, getDefaultColumns } from "./helpers/ColumnsHelper";
import { getDefaultRows } from "./helpers/RowsHelper";
import {
  dataGridInitialValues,
  dataGridReducer,
} from "./containers/dataGrid/DataGridReducer";
import { dataGridActions } from "./containers/dataGrid/DataGridActions";
import EditableCell from "./containers/dataGrid/EditableCell";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    height: `calc(100vh - 64px)`,
    background: `${alpha(colors.paleGrey, 0.4)}`,
    padding: "2rem",
  },
  dataGridDetailsContainer: {
    marginBottom: "2rem",
  },
  dataGridTitleContainer: {
    marginBottom: "0.5rem",
  },
  dataGridTitle: {
    fontSize: "1.125rem",
    fontWeight: fontWeights[600],
  },
  dataGridInfoContainer: {
    marginTop: "0.5rem",
  },
  dataGridInfo: {
    fontSize: "0.875rem",
  },
  paperRoot: {
    padding: "1rem",
  },
  topContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    marginBottom: "1rem",
  },
  searchFieldContainer: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "20rem",
  },
  historyButtonContainer: {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  dataGridContainer: {
    marginTop: "1rem",
    "& .rdg-header-row": {
      background: `${alpha(colors.blue, 0.05)}`,
      textAlign: "center",
    },
    "& .c1wupbe700-beta12": {
      textAlign: "center",
    },
    "& .r1otpg64700-beta12:hover": {
      background: `${alpha(colors.blue, 0.8)}`,
    },
    "& .h197vzie700-beta12>.c1wupbe700-beta12": {
      fontSize: "0.75rem",
    },
    // "& :root": {
    //   "--rdg-row-hover-background-color": colors.blue,
    // },
    // "& .rdg-row :hover": {
    //   // background: `${alpha("var(--rdg-row-hover-background-color)", 0.8)}`,
    //   background: `${alpha(colors.blue, 0.8)}`,
    // },
  },
}));

function App() {
  const [searchText, setSearchText] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [state, dispatch] = useReducer(dataGridReducer, dataGridInitialValues);
  const { rows, columns } = state;

  const classes = useStyles();

  useEffect(() => {
    const localStorageColumns = localStorage.getItem(localStorageKeys.columns);
    if (!localStorageColumns) {
      localStorage.setItem(
        localStorageKeys.columns,
        JSON.stringify(getDefaultColumns())
      );
    } else {
      let parsedColumns = JSON.parse(localStorageColumns);
      const formattedColumns = formatColumns(parsedColumns, EditableCell);
      // console.log("columns with other options: ", formattedColumns);
      dispatch({
        type: dataGridActions.setColumns,
        payload: {
          newColumns: formattedColumns,
        },
      });
    }

    const localStorageRows = localStorage.getItem(localStorageKeys.rows);
    if (!localStorageRows) {
      localStorage.setItem(
        localStorageKeys.rows,
        JSON.stringify(getDefaultRows())
      );
    } else {
      dispatch({
        type: dataGridActions.setRows,
        payload: {
          newRows: JSON.parse(localStorageRows),
        },
      });
    }
  }, []);

  function handleSearchTextChange(event) {
    const newValue = event.target.value;
    console.log("newValue: ", newValue);
    setSearchText(newValue);
  }

  function handleRowsChange(changedRows) {
    console.log("called");
    dispatch({
      type: dataGridActions.setRows,
      payload: {
        newRows: changedRows,
      },
    });
    localStorage.setItem(localStorageKeys.rows, JSON.stringify(changedRows));
  }

  return (
    <ThemeProvider theme={theme}>
      <Header userAvatar="CB" title={messages["AppBar.header"]} />
      <main className={classes.container}>
        <div className={classes.dataGridDetailsContainer}>
          <div className={classes.dataGridTitleContainer}>
            <Typography variant="h2" classes={{ root: classes.dataGridTitle }}>
              {messages["DataGridDetails.heading"]}
            </Typography>
          </div>
          <div className={classes.dataGridInfoContainer}>
            <Typography
              variant="body1"
              classes={{ root: classes.dataGridInfo }}
            >
              {messages["DataGridDetails.info"]}
            </Typography>
          </div>
        </div>
        <Paper classes={{ root: classes.paperRoot }}>
          <div className={classes.topContainer}>
            <div className={classes.searchFieldContainer}>
              <SearchField
                value={searchText}
                onChange={handleSearchTextChange}
                placeholder={messages["SearchField.placeholder"]}
                id="search"
              />
            </div>
            <div className={classes.historyButtonContainer}>
              <Button
                buttonText={messages["Button.history"]}
                startIcon={<HistoryIcon height="0.875rem" width="0.875rem" />}
                onClick={() => setIsDrawerOpen(true)}
              />
            </div>
          </div>
          <div className={classes.dataGridContainer}>
            <DataGrid
              columns={columns}
              rows={rows}
              className="rdg-light"
              onRowsChange={handleRowsChange}
            />
          </div>
        </Paper>
        <Drawer
          anchor="right"
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        >
          FUN FUN FUN DRAWER
        </Drawer>
      </main>
    </ThemeProvider>
  );
}

export default App;
