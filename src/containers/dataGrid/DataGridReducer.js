import { dataGridActions } from "./DataGridActions";

export const dataGridInitialValues = {
  rows: [],
  columns: [],
  history: [],
};

export function dataGridReducer(state, { type, payload }) {
  switch (type) {
    case dataGridActions.setColumns: {
      return {
        ...state,
        columns: payload.newColumns,
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
      }
    }

    default: {
      return { ...state };
    }
  }
}
