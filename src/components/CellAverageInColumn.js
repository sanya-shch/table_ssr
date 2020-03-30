// @flow

import React from "react";
import { useSelector } from "react-redux";
import { getAverageValueInColumn } from "../redux/selectors";
import type { Store } from "../redux/reducers/tableReducer";

type Props = {
  columnSumId: string
};

const CellAverageInColumn = ({ columnSumId }: Props) => {
  const averageValueInColumn: number = useSelector((state: Store) =>
    getAverageValueInColumn(state, columnSumId)
  );

  return <td>{averageValueInColumn}</td>;
};

export default React.memo<Props>(CellAverageInColumn);
