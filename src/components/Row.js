// @flow

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteRow,
  setCloseValue,
  addAmount,
  setRowPercents
} from "../redux/actions/tableActions";
import Cell from "./Cell";
import { getRowSum, getRow } from "../redux/selectors";
import type { Store } from "../redux/reducers/tableReducer";
import type { Dispatch } from "../redux/reducers/tableReducer";

type Props = {
  rowId: string
};

const Row = ({ rowId }: Props) => {
  const row: string[] = useSelector((state: Store) => getRow(state, rowId));
  const sum: number = useSelector((state: Store) => getRowSum(state, rowId));

  const dispatch: Dispatch = useDispatch<Dispatch>();

  const handleOnmouseOverSum = (rowId: string): void => {
    dispatch(setRowPercents(rowId));
  };

  const handleOnmouseLeaveSum = () => {
    dispatch(setRowPercents("clean")); //
  };

  const handleClickDelete = (rowId: string): void => {
    dispatch(deleteRow(rowId));
  };

  const handleOnmouseOverCell: HandleOnmouseOverCell = id => {
    dispatch(setCloseValue(id));
  };

  const handleOnmouseLeaveCell: HandleOnmouseLeaveCell = () => {
    dispatch(setCloseValue());
  };

  const handleClickAddAmount: HandleClickAddAmount = (cellId, cellIndex) => {
    dispatch(addAmount(cellId, cellIndex));
  };

  return (
    <tr>
      {row.map((cellId, cellIndex) => (
        <Cell
          key={`table-cell-${cellId}`}
          cellId={cellId}
          cellIndex={cellIndex}
          onclick={handleClickAddAmount}
          onmouseover={handleOnmouseOverCell}
          onmouseout={handleOnmouseLeaveCell}
        />
      ))}
      <td
        onMouseOver={() => handleOnmouseOverSum(rowId)}
        onMouseOut={handleOnmouseLeaveSum}
      >
        {sum}
      </td>
      <td className="delBtn" onClick={() => handleClickDelete(rowId)}>
        Delete
      </td>
    </tr>
  );
};

export type HandleClickAddAmount = (string, number) => void;
export type HandleOnmouseOverCell = string => void;
export type HandleOnmouseLeaveCell = () => void;

export default React.memo<Props>(Row);
