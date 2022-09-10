import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";
import { useTranslation } from "react-i18next";

interface IPaymentsTableProps {
  tableRows: any[];
}
const PaymentsTable: React.FC<IPaymentsTableProps> = ({ tableRows }) => {
  const { t } = useTranslation();

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{t("pages.home.cardPayments.table.order")}</TableCell>
            <TableCell>{t("pages.home.cardPayments.table.customer")}</TableCell>
            <TableCell>{t("pages.home.cardPayments.table.amount")}</TableCell>
            <TableCell>{t("pages.home.cardPayments.table.date")}</TableCell>
            <TableCell>{t("pages.home.cardPayments.table.status")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableRows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.order}</TableCell>
              <TableCell>{row.customer}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PaymentsTable;
