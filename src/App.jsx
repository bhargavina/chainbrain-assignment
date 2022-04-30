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
import { historyActions, localStorageKeys } from "./constants/Constants";
import { formatColumns, getDefaultColumns } from "./helpers/ColumnsHelper";
import { getDefaultRows } from "./helpers/RowsHelper";
import {
  dataGridInitialValues,
  dataGridReducer,
} from "./containers/dataGrid/DataGridReducer";
import { dataGridActions } from "./containers/dataGrid/DataGridActions";
import DrawerContent from "./containers/dataGrid/DrawerContent";
import { formatHistory } from "./helpers/HistoryHelper";

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
  drawerPaper: {
    width: "31.25rem",
  },
}));

function App() {
  const [searchText, setSearchText] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [state, dispatch] = useReducer(dataGridReducer, dataGridInitialValues);
  const { rows, columns, filteredColumns, history } = state;

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
      const formattedColumns = formatColumns(parsedColumns);
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

    const localStorageHistory = localStorage.getItem(localStorageKeys.history);
    if (!localStorageHistory) {
      localStorage.setItem(
        localStorageKeys.history,
        // JSON.stringify(
        //   getDefaultHistory().sort(
        //     (a, b) => new Date(b.time).valueOf() - new Date(a.time).valueOf()
        //   )
        // )
        JSON.stringify([])
      );
    } else {
      dispatch({
        type: dataGridActions.setHistory,
        payload: {
          newHistory: JSON.parse(localStorageHistory),
        },
      });
    }
  }, []);

  function handleSearchTextChange(event) {
    const newValue = event.target.value;
    setSearchText(newValue);
    if (newValue === "") {
      dispatch({
        type: dataGridActions.setFilteredColumns,
        payload: {
          newColumns: columns.map((column) => ({ ...column })),
        },
      });
    } else {
      dispatch({
        type: dataGridActions.setFilteredColumns,
        payload: {
          newColumns: columns.filter((column) =>
            column.name.toLowerCase().includes(newValue.toLowerCase())
          ),
        },
      });
    }
  }

  function handleRowsChange(updatedRows, updatedRowsIndices) {
    const changedHistory = history.map((item) => ({ ...item }));
    const newItem = {
      id: changedHistory.length + 1,
      action: historyActions.modify,
      columnNum: updatedRowsIndices.column.idx + 1,
      rowNum: updatedRowsIndices.indexes[0] + 1,
      date: (function () {
        const date = new Date();
        date.setHours(23);
        date.setMinutes(59);
        date.setSeconds(59);
        date.setMilliseconds(59);
        return new Date(date);
      })(),
      time: new Date(),
    };
    changedHistory.push(newItem);
    changedHistory.sort(
      (a, b) => new Date(b.time).valueOf() - new Date(a.time).valueOf()
    );
    dispatch({
      type: dataGridActions.onRowsChange,
      payload: {
        newRows: updatedRows,
        newHistory: JSON.parse(JSON.stringify(changedHistory)),
      },
    });
    localStorage.setItem(localStorageKeys.rows, JSON.stringify(updatedRows));
    localStorage.setItem(
      localStorageKeys.history,
      JSON.stringify(changedHistory)
    );
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
              columns={filteredColumns}
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
          classes={{ paper: classes.drawerPaper }}
        >
          <DrawerContent
            onCloseIconClick={() => setIsDrawerOpen(false)}
            historyItems={formatHistory(history)}
          />
        </Drawer>
      </main>
    </ThemeProvider>
  );
}

export default App;
