// @flow

import type { Store } from "../reducers/tableReducer";

type GetRow = (Store, string) => string[];

const getRow: GetRow = (state, id) => state.table.rows[id];

export default getRow;
