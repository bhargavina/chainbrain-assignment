import { dataGridActions } from "./DataGridActions";

export const dataGridInitialValues = {
  rows: [],
  columns: [],
  history: [],
  filteredColumns: [],
};

export function dataGridReducer(state, { type, payload }) {
  switch (type) {
    case dataGridActions.setColumns: {
      return {
        ...state,
        columns: payload.newColumns,
        filteredColumns: payload.newColumns,
      };
    }

    case dataGridActions.setFilteredColumns: {
      return {
        ...state,
        filteredColumns: payload.newColumns,
      };
    }

    case dataGridActions.setRows: {
      return {
        ...state,
        rows: payload.newRows,
      };
    }

    case dataGridActions.setHistory: {
      return {
        ...state,
        history: payload.newHistory,
      };
    }

    case dataGridActions.onRowsChange: {
      return {
        ...state,
        history: payload.newHistory,
        rows: payload.newRows,
      };
    }

    default: {
      return { ...state };
    }
  }
}
