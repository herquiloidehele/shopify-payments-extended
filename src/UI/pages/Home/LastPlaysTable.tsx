import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";
import { useTranslation } from "react-i18next";

interface ILastPlaysTableProps {
  tableRows: any[];
}
const LastPlaysTable: React.FC<ILastPlaysTableProps> = ({ tableRows }) => {
  const { t } = useTranslation();

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{t("pages.home.cardLastPlays.table.createdBy")}</TableCell>
            <TableCell>{t("pages.home.cardLastPlays.table.acceptedBy")}</TableCell>
            <TableCell>{t("pages.home.cardLastPlays.table.challengeValue")}</TableCell>
            <TableCell>{t("pages.home.cardLastPlays.table.winner")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableRows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.createdBy}</TableCell>
              <TableCell>{row.acceptedBy}</TableCell>
              <TableCell>{row.value}</TableCell>
              <TableCell>{row.winner}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LastPlaysTable;
