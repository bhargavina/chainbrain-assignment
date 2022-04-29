import { dataGridActions } from "./DataGridActions";

export const dataGridInitialValues = {
  rows: [],
  columns: [],
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

    default: {
      return { ...state };
    }
  }
}
