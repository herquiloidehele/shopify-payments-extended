export interface IPackageResponse {
  _id?: string;
  name: string;
  price: number;
  monthsDuration: number;
  description?: string;
  image?: string;
  created_at: Date;
}

export interface IShopResponse {
  _id?: string;
  shopName: string;
  shop: string;
  active: boolean;
  accessToken: string;
  hasOwnPaymentSettings: boolean;
  withdrawPhoneNumber: string;
}

export interface ISubscriptionResponse {
  _id?: string;
  shop: IShopResponse;
  package: IPackageResponse;
  validUntil: string;
  created_at: string;
}

export type INewShopRequest = {
  shopName: string;
  shop: string;
  active: boolean;
  accessToken: string;
  withdrawPhoneNumber: string;
  hasOwnPaymentSettings?: boolean;
};

export interface IEditShopRequest {
  shopName: string;
  shop: string;
  active: boolean;
  accessToken: string;
  withdrawPhoneNumber: string;
  hasOwnPaymentSettings: boolean;
}
