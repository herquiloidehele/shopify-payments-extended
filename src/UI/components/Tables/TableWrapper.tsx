import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";

interface ITableWrapperProps {
  columns: any[];
  rows: any[];
}
const TableWrapper: React.FC<ITableWrapperProps> = ({ columns, rows }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell key={index}>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              {Object.values(row).map((cell: any, indexCell) => (
                <TableCell key={indexCell}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableWrapper;
