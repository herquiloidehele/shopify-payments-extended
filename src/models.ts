import { Dayjs } from "dayjs";

import EN_Icon from "./UI/assets/icon/ic_flag_en.svg";
import PT_Icon from "./UI/assets/img/pt-flag.png";
import { IDropdownItem } from "./UI/components/Dropdown/Dropdown";

export interface IUser {
  id: string;
  email: string;
  name: string;
  role: USER_ROLES;
  token: string;
  storeId: string;
  createdAt: Date;
  status: boolean;
  password?: string;
  hasOwnPaymentSettings?: boolean;
}

export interface IShop {
  id?: string;
  shopReference: string;
  accessToken: string;
  status: boolean;
  hasOwnPaymentSettings: boolean;
  withdrawPhoneNumber: string;
}

export interface ISubscription {
  id?: string;
  shop: Partial<IShop>;
  package: Partial<IPackage>;
  validUntil: Dayjs;
  created_at: Dayjs;
}

export interface INewSubscription {
  shopId: string;
  packageId: string;
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
  hasWithdrawed: boolean;
}

export interface IHomeProps {
  paymentReport: IPaymentReport;
  paymentReportError: boolean;
  paymentReportLoading: boolean;
}

const LANGUAGUES: IDropdownItem[] = [
  {
    id: 1,
    description: "PT",
    key: "PT",
    icon: PT_Icon,
  },
  {
    id: 2,
    description: "EN",
    key: "EN",
    icon: EN_Icon,
  },
];

export interface IPackage {
  id?: string;
  name: string;
  price: number;
  monthsDuration: number;
  description?: string;
  image?: string;
}

export { LANGUAGUES };
