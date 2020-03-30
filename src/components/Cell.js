// @flow

import React from "react";
import { useSelector } from "react-redux";
import {
  getCellAmount,
  getIsCloseValue,
  getCellPercent
} from "../redux/selectors";
import type { Store } from "../redux/reducers/tableReducer";
import type {
  HandleClickAddAmount,
  HandleOnmouseOverCell,
  HandleOnmouseLeaveCell
} from "./Row";

type Props = {
  cellId: string,
  cellIndex: number,
  onclick: HandleClickAddAmount,
  onmouseover: HandleOnmouseOverCell,
  onmouseout: HandleOnmouseLeaveCell
};

const Cell = (props: Props) => {
  const { cellIndex, cellId, onclick, onmouseover, onmouseout } = props;

  const amount: number = useSelector((state: Store) =>
    getCellAmount(state, props)
  );
  const isClose: boolean = useSelector((state: Store) =>
    getIsCloseValue(state, cellId)
  );
  const percent: string = useSelector((state: Store) =>
    getCellPercent(state, cellId)
  );

  const style = {
    background: `linear-gradient(to top, #f6003c ${percent}, #a2a9af 0%)`
  };

  return (
    <td
      className={`tableCell ${isClose ? "closeValue" : ""}`}
      style={percent && style}
      onClick={() => onclick(cellId, cellIndex)}
      onMouseOver={() => onmouseover(cellId)}
      onMouseOut={onmouseout}
    >
      {percent ? percent : amount}
    </td>
  );
};

export default Cell;
