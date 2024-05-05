import { Snackbar } from "@mui/material";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import PaymentsManager from "../../../Managers/PaymentsManager";
import { IPayment } from "../../../models";
import { Constants } from "../../../Utils/constants/Constants";
import { formatCurrency } from "../../../Utils/functions/Ui";
import { MoneyStye } from "../../components/Generic/Style";
import ModalWrapper from "../../components/Modals/ModalWrapper";
import TableWrapper from "../../components/Tables/TableWrapper";
import useHome from "../Home/useHome";
import { LabelSummaryIndicator, SummaryContainer, SummaryItem, ValueSummaryIndicator } from "./Style";

interface ICreateUserModalProps {
  isOpen: boolean;
  onClose: (saved: boolean) => void;
}
interface IWithdrawsResponse {
  successWithdraws: string[];
  failedWithdraws: string[];
}
const WithdrawPaymentsModal: React.FC<ICreateUserModalProps> = ({ isOpen, onClose }) => {
  const [fetchingLoading, setFetchLoading] = React.useState(false);
  const [modalData, setModalData] = React.useState<any | undefined>();
  const [showPopup, setShowPopup] = React.useState(false);
  const [toastMeessage, setToastMessage] = useState("");
  const [pendingWithdraws, setPendingWithdraws] = useState<IPayment[]>([]);
  const [withdrawsResponse, setWithdrawsResponse] = useState<IWithdrawsResponse>({ successWithdraws: [], failedWithdraws: [] });
  const { pendingWithdrawsTableColumns } = useHome();
  const { t } = useTranslation();

  const handleClodeModal = useCallback(() => {
    if (!modalData) {
      onClose(false);
      return;
    }

    setModalData({ ...modalData, isOpen: false });
    onClose(false);
  }, [modalData]);

  const initModalInfo = useCallback(() => {
    setModalData({
      id: "withdraw-payments-modal",
      isOpen: false,
      title: t("pages.payments.paymentWithdrawal"),
      actionButtonText: t("pages.payments.withdraw"),
    });
  }, [modalData]);

  useEffect(() => {
    initModalInfo();
  }, []);

  function fetchPendingWithdraws() {
    setFetchLoading(true);
    PaymentsManager.getPendingWithdraws()
      .then((withdraws: IPayment[]) => {
        setPendingWithdraws(withdraws);
      })
      .finally(() => {
        setFetchLoading(false);
      });
  }

  useEffect(() => {
    fetchPendingWithdraws();
  }, []);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setShowPopup(false);
  };

  const createPaymentData = useCallback(
    (pendingWithdraws: IPayment[]): any[] => {
      if (!pendingWithdraws) {
        return [];
      }

      return pendingWithdraws.map((data: IPayment) => ({
        order: `${data.orderNumber}`,
        amount: <MoneyStye mode="SUCCESS">{formatCurrency(data.price)}</MoneyStye>,
        date: dayjs(data.createdAt).format(Constants.DATE_FORMATS.DATE_TIME),
      }));
    },
    [pendingWithdraws]
  );

  function withdrawPayments() {
    setFetchLoading(true);
    PaymentsManager.withdrawPayments()
      .then((response) => {
        setWithdrawsResponse(response);
        setToastMessage("Pagamentos levantados com sucesso");
        setShowPopup(true);
        fetchPendingWithdraws();
      })
      .finally(() => {
        setFetchLoading(false);
      });
  }

  return modalData && pendingWithdraws ? (
    <ModalWrapper {...modalData} isOpen={isOpen} actionButtonDisabled={pendingWithdraws.length === 0 || fetchingLoading} actionButtonOnClick={() => withdrawPayments()} handleClose={handleClodeModal}>
      <div style={{ width: "100%" }}>
        <SummaryContainer>
          <SummaryItem backgroundColor="#a1520082" textColor="#552f07d4">
            <ValueSummaryIndicator>{pendingWithdraws.length}</ValueSummaryIndicator>
            <LabelSummaryIndicator>Total de Pagamentos</LabelSummaryIndicator>
          </SummaryItem>
          <SummaryItem backgroundColor="#0095439e" textColor="#03411f">
            <ValueSummaryIndicator>{withdrawsResponse.successWithdraws.length}</ValueSummaryIndicator>
            <LabelSummaryIndicator>Bem Sucedidos</LabelSummaryIndicator>
          </SummaryItem>
          <SummaryItem backgroundColor="#ff00003d" textColor="#7f2020de">
            <ValueSummaryIndicator>{withdrawsResponse.failedWithdraws.length}</ValueSummaryIndicator>
            <LabelSummaryIndicator>Mal Sucedidos</LabelSummaryIndicator>
          </SummaryItem>
        </SummaryContainer>

        <TableWrapper columns={pendingWithdrawsTableColumns} rows={createPaymentData(pendingWithdraws)} />
        <Snackbar open={showPopup} autoHideDuration={6000} onClose={handleClose} message={toastMeessage} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} />
      </div>
    </ModalWrapper>
  ) : null;
};

export default WithdrawPaymentsModal;
