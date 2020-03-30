// @flow

import type { Store } from "../reducers/tableReducer";

type GetIsCloseValue = (Store, string) => boolean;

const getIsCloseValue: GetIsCloseValue = (state, id) =>
  Boolean(state.table.closeValues[id]);

export default getIsCloseValue;
