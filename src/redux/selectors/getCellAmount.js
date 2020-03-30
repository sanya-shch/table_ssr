// @flow

import type { Store } from "../reducers/tableReducer";

const getCellAmount: (state: Store, props: { cellId: string }) => number = (
  state,
  props
) => state.table.cells[props.cellId].amount;

export default getCellAmount;
