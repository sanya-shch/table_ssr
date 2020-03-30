// @flow

import type { Store } from "../reducers/tableReducer";

type GetRowSum = (Store, string) => number;

const getRowSum: GetRowSum = (state, id) => {
  return state.table.rows[id].reduce(
    (a, b) => state.table.cells[b].amount + a,
    0
  );
};

export default getRowSum;
