// @flow

import type { Store } from "../reducers/tableReducer";

type GetCellPercent = (Store, string) => string;

const getCellPercent: GetCellPercent = (state, id) =>
  state.table.rowPercents[id];

export default getCellPercent;
