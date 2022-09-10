import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";
import { useTranslation } from "react-i18next";

interface IBestPlayersTableProps {
  tableRows: any[];
}
const BestPlayersTable: React.FC<IBestPlayersTableProps> = ({ tableRows }) => {
  const { t } = useTranslation();

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{t("pages.home.cardBestPlayers.table.name")}</TableCell>
            <TableCell align="right">{t("pages.home.cardBestPlayers.table.balance")}</TableCell>
            <TableCell align="right">{t("pages.home.cardBestPlayers.table.victoriesAndDefeats")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableRows.map((row, key) => (
            <TableRow key={key}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.balance}</TableCell>
              <TableCell align="right">{row.winnesDefiets}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BestPlayersTable;
