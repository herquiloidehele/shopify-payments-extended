export interface IUser {
  id: string;
  email: string;
  name: string;
  role: USER_ROLES;
  token: string;
  storeId: string;
  createdAt: Date;
  status: boolean;
}

export enum USER_ROLES {
  ADMIN = "ADMIN",
  STORE_OWNER = "STORE_OWNER",
}

export interface IUserReport {
  total: string;
  users: IUser[];
}

export interface IPaymentReport {
  payments: IPayment[];
  paymentsCount: string;
  paymentsTotal: string;
}

export interface IPayment {
  id: string;
  orderNumber: string;
  customer: string;
  price: string;
  orderId: string;
  status: string;
  shop: string;
  createdAt: string;
}

export interface IHomeProps {
  paymentReport: IPaymentReport;
  paymentReportError: boolean;
  paymentReportLoading: boolean;
}
