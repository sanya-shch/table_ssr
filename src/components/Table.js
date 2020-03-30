// @flow

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addRow } from "../redux/actions/tableActions";
import CellAverageInColumn from "./CellAverageInColumn";
import Row from "./Row";
import type { Store } from "../redux/reducers/tableReducer";
import type { Dispatch } from "../redux/reducers/tableReducer";

const Table = () => {
  const table: string[] = useSelector((state: Store) => state.table.table);
  const columnSumRow: string[] = useSelector(
    (state: Store) => state.table.columnSumRow
  );

  const dispatch: Dispatch = useDispatch<Dispatch>(); // const dispatch = useDispatch();

  const handleClickAdd = () => {
    dispatch(addRow());
  };

  return (
    <>
      {table.length > 0 && (
        <table>
          <tbody>
            {table.map(rowId => (
              <Row key={`table-row-${rowId}`} rowId={rowId} />
            ))}
            <tr>
              {columnSumRow.map(columnSumId => (
                <CellAverageInColumn
                  key={`average-value-in-column-${columnSumId}`}
                  columnSumId={columnSumId}
                />
              ))}
              <td data-testid="add" className="addBtn" onClick={handleClickAdd}>
                Add
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
};

export default Table;
