// @flow

import {
  SET_TABLE,
  ADD_ROW,
  DELETE_ROW,
  ADD_AMOUNT,
  SET_CLOSE_VALUES,
  SET_ROW_PERCENTS
} from "./types";

// 4
/*
type ActionWithoutPayloadType<T> = {|
  type: T
|};
type ActionWithPayloadType<T, P> = {|
  type: T,
  payload: P
|};

export type SetTableActionType = ActionWithPayloadType<
  typeof SET_TABLE,
  {| m: number, n: number, x: number |}
>;
export type AddRowActionType = ActionWithPayloadType<typeof ADD_ROW, string>; // ActionWithoutPayloadType<typeof ADD_ROW>;
export type DeleteRowActionType = ActionWithPayloadType<
  typeof DELETE_ROW,
  string
>;
export type AddAmountActionType = ActionWithPayloadType<
  typeof ADD_AMOUNT,
  {| cellId: string, cellIndex: number |}
>;
export type SetCloseValueActionType = ActionWithPayloadType<
  typeof SET_CLOSE_VALUES,
  ?string
>;
export type SetRowPercentsActionType = ActionWithPayloadType<
  typeof SET_ROW_PERCENTS,
  ?string
>;

export type ActionType =
  | SetTableActionType
  | DeleteRowActionType
  | AddAmountActionType
  | SetCloseValueActionType
  | SetRowPercentsActionType;

export type SetTable = (number, number, number) => SetTableActionType;
export const setTable: SetTable = (m, n, x) => {
  return {
    type: SET_TABLE,
    payload: { m, n, x }
  };
};

export type AddRow = () => AddRowActionType;
export const addRow: AddRow = () => {
  return {
    type: ADD_ROW,
    payload: "newrow"
  };
};

export type DeleteRow = string => DeleteRowActionType;
export const deleteRow: DeleteRow = rowId => {
  return {
    type: DELETE_ROW,
    payload: rowId
  };
};

export type AddAmount = (string, number) => AddAmountActionType;
export const addAmount: AddAmount = (cellId, cellIndex) => {
  return {
    type: ADD_AMOUNT,
    payload: { cellId, cellIndex }
  };
};

export type SetCloseValue = (?string) => SetCloseValueActionType;
export const setCloseValue: SetCloseValue = id => {
  return {
    type: SET_CLOSE_VALUES,
    payload: id
  };
};

export type SetRowPercents = (?string) => SetRowPercentsActionType; // string
export const setRowPercents: SetRowPercents = id => {
  return {
    type: SET_ROW_PERCENTS,
    payload: id
  };
};
*/

// 3
type ExtractReturn<Fn> = $Call<<T>((...Array<any>) => T) => T, Fn>;

export type ActionType =
  | ExtractReturn<typeof setTable>
  | ExtractReturn<typeof addRow>
  | ExtractReturn<typeof deleteRow>
  | ExtractReturn<typeof addAmount>
  | ExtractReturn<typeof setCloseValue>
  | ExtractReturn<typeof setRowPercents>;

// 2
/*
type _ExtractReturn<B, F: (...args?: any[]) => B> = B;
type ExtractReturn<F> = _ExtractReturn<*, F>;

export type ActionType =
  | ExtractReturn<typeof setTable>
  | ExtractReturn<typeof addRow>
  | ExtractReturn<typeof deleteRow>
  | ExtractReturn<typeof addAmount>
  | ExtractReturn<typeof setCloseValue>
  | ExtractReturn<typeof setRowPercents>;
*/

// 1
/*
export type ActionType = $Values<
  $ObjMap<
    {
      setTable: typeof setTable,
      addRow: typeof addRow,
      deleteRow: typeof deleteRow,
      addAmount: typeof addAmount,
      setCloseValue: typeof setCloseValue,
      setRowPercents: typeof setRowPercents
    },
    <A>((...arrg?: any[]) => A) => $Exact<A> // <A>((...any[]) => A) => A // <A>((...any[]) => A) => $Exact<A>
  >
>;
*/

export function setTable(m: number, n: number, x: number) {
  return {
    type: SET_TABLE,
    payload: { m, n, x }
  };
}

export function addRow() {
  return {
    type: ADD_ROW
  };
}

export function deleteRow(rowId: string) {
  return {
    type: DELETE_ROW,
    payload: rowId
  };
}

export function addAmount(cellId: string, cellIndex: number) {
  return {
    type: ADD_AMOUNT,
    payload: { cellId, cellIndex }
  };
}

export function setCloseValue(id: ?string) {
  return {
    type: SET_CLOSE_VALUES,
    payload: id
  };
}

export function setRowPercents(id: string) {
  // id: ?string
  return {
    type: SET_ROW_PERCENTS,
    payload: id
  };
}
