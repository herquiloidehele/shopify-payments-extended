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
  shop: string;
  active: boolean;
  accessToken: string;
}

export interface ISubscriptionResponse {
  _id?: string;
  shop: IShopResponse;
  package: IPackageResponse;
  validUntil: string;
  created_at: string;
}
