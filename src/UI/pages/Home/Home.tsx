import React, { useEffect, useState } from "react";

import AppService from "../../../Api/Services/AppService";
import AuthService from "../../../Api/Services/AuthService";
import { IPaymentReport } from "../../../models";
import AdminHome from "./AdminHome";
import StoreOwnerHome from "./StoreOwnerHome";

const Home: React.FC = () => {
  const [paymentReport, setPaymentsReport] = useState<IPaymentReport>({} as IPaymentReport);
  const [paymentsError, setPaymentsError] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  const fetchPaymentsReport = () => {
    setLoading(true);
    setPaymentsError(false);

    AppService.getShopReport()
      .then((paymentReport: any) => {
        setPaymentsReport(paymentReport);
      })
      .catch(() => {
        setPaymentsError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPaymentsReport();
  }, []);

  return AuthService.isStoreOwner ? (
    <StoreOwnerHome paymentReport={paymentReport} paymentReportError={paymentsError} paymentReportLoading={loading} />
  ) : AuthService.isUserAdmin ? (
    <AdminHome paymentReport={paymentReport} paymentReportError={paymentsError} paymentReportLoading={loading} />
  ) : (
    <h1>No user defined</h1>
  );
};

export default Home;
