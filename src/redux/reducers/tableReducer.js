// @flow

import {
  SET_TABLE,
  ADD_ROW,
  DELETE_ROW,
  ADD_AMOUNT,
  SET_CLOSE_VALUES,
  SET_ROW_PERCENTS
} from "../actions/types";

import type { ActionType } from "../actions/tableActions";

export type Table = string[];
export type Cells = {
  [key: string]: {
    id: string,
    amount: number
  }
};
export type Rows = {
  [key: string]: string[]
};
export type ColumnSumRow = string[];
export type RowPercents = {
  [key: string]: string
};
export type ColumnSum = {
  [key: string]: {
    id: string,
    value: number
  }
};
export type CloseValues = {
  [key: string]: {
    id: string,
    amount: number
  }
};

export type State = {
  +table: Table,
  +rows: Rows,
  +cells: Cells,
  +columnSumRow: ColumnSumRow,
  +columnSum: ColumnSum,
  +closeValues: CloseValues,
  +rowPercents: RowPercents,
  +x: number
};

export type Store = {
  table: State
};

export const initialState: State = {
  table: [],
  rows: {},
  cells: {},
  columnSumRow: [],
  columnSum: {},
  closeValues: {},
  rowPercents: {},
  x: 0
};

export type Dispatch = (action: ActionType) => void;

const tableReducer = (
  state: State = initialState,
  action: ActionType
): State => {
  let table: Table = [];
  let rows: Rows = {};
  let cells: Cells = {};
  let columnSum = {};

  switch (action.type) {
    case SET_TABLE:
      let rowId: string;
      let row: string[];
      let amount: number;
      let id: string;

      for (let i = 0; i < action.payload.m; i++) {
        row = [];
        rowId = `${i}`;

        table.push(rowId);

        for (let j = 0; j < action.payload.n; j++) {
          amount = Math.round(100 + Math.random() * (999 - 100));
          id = `${i}-${j}`;

          row.push(id);
          cells[id] = { id, amount };
        }

        rows[rowId] = row;
      }

      //

      const columnSumRow = [];

      let value: number;
      let columnSumId;

      for (let i = 0; i < action.payload.n; i++) {
        value = 0;

        for (let j = 0; j < action.payload.m; j++) {
          value += cells[rows[table[j]][i]].amount;
        }

        columnSumId = `averageColumn${i}`;
        columnSum[columnSumId] = { id: columnSumId, value };
        columnSumRow.push(columnSumId);
      }

      return {
        ...state,
        table,
        rows,
        cells,
        columnSum,
        columnSumRow,
        x: action.payload.x
      };
    case ADD_ROW:
      //   console.log(state);
      let newRowId = `${parseInt(state.table[state.table.length - 1], 10) + 1}`;
      let newRow = [];
      let newCells = {};

      columnSum = { ...state.columnSum };

      for (let j = 0, len = state.rows[state.table[0]].length; j < len; j++) {
        const amount = Math.round(100 + Math.random() * (999 - 100));
        const id = `${newRowId}-${j}`;

        newRow.push(id);
        newCells[id] = { id, amount };

        columnSum[state.columnSumRow[j]].value += amount;
      }

      return {
        ...state,
        table: [...state.table, newRowId],
        rows: { ...state.rows, [newRowId]: newRow },
        cells: { ...state.cells, ...newCells },
        columnSum
      };
    case DELETE_ROW:
      rows = { ...state.rows };
      cells = { ...state.cells };
      columnSum = { ...state.columnSum };

      for (let i = 0, len = state.rows[state.table[0]].length; i < len; i++) {
        columnSum[state.columnSumRow[i]].value -=
          cells[rows[action.payload][i]].amount;
        delete cells[state.rows[action.payload][i]];
      }

      delete rows[action.payload];

      table = state.table.filter(row => row !== action.payload);

      return {
        ...state,
        cells,
        table,
        rows,
        columnSum
      };
    case ADD_AMOUNT:
      cells = { ...state.cells };
      columnSum = { ...state.columnSum };

      cells[action.payload.cellId].amount++;

      columnSum[state.columnSumRow[action.payload.cellIndex]].value++;

      return {
        ...state,
        cells,
        columnSum
      };
    case SET_CLOSE_VALUES:
      const closeValues: CloseValues = {};

      if (typeof action.payload === "string") {
        const cell = state.cells[action.payload];
        let cv: Array<{ amount: number, id: string }> = [];
        let index = 0;
        for (let key in state.cells) {
          cv[index] = {
            ...state.cells[key],
            amount: Math.abs(state.cells[key].amount - cell.amount)
          };

          index++;
        }

        cv = cv.sort((a, b) => a.amount - b.amount).slice(0, state.x + 1);

        for (let i = 0; i < cv.length; i++) {
          closeValues[cv[i].id] = cv[i];
        }
      }

      /* if (typeof action.payload === "string") {
        const cell = state.cells[action.payload];
        let cv = { ...state.cells };
        cv = Object.entries(cv)
          .map(([k, v]) => ({ ...v, amount: Math.abs(v.amount - cell.amount) }))
          .sort((a, b) => a.amount - b.amount)
          .slice(0, state.x + 1);

        for (let i = 0; i < cv.length; i++) {
          closeValues[cv[i].id] = cv[i];
        }
      } */

      return {
        ...state,
        closeValues
      };
    case SET_ROW_PERCENTS:
      const rowPercents: RowPercents = {};

      if (action.payload !== "clean") {
        // if (typeof action.payload === "string") {
        const sum: number = state.rows[action.payload].reduce(
          (a, b) => state.cells[b].amount + a,
          0
        );

        for (let i = 0, len = state.rows[state.table[0]].length; i < len; i++) {
          rowPercents[state.rows[action.payload][i]] =
            (
              Math.round(
                ((100 * state.cells[state.rows[action.payload][i]].amount) /
                  sum) *
                  100
              ) / 100
            ).toString() + "%";
        }
      }

      return {
        ...state,
        rowPercents
      };
    default:
      return state;
  }
};

export default tableReducer;
