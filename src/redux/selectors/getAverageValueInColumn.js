// @flow

import type { Store } from "../reducers/tableReducer";

type GetAverageValueInColumn = (Store, string) => number;

const getAverageValueInColumn: GetAverageValueInColumn = (state, id) =>
  Math.round(
    (state.table.columnSum[id].value / state.table.table.length) * 100
  ) / 100;

export default getAverageValueInColumn;
