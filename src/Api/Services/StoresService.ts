import { IEditShopRequest, INewShopRequest, IShopResponse } from "../../ModelDaos";
import { IShop } from "../../models";
import Logger from "../../Utils/Logger";
import HttpClient from "../HttpClient";

export default abstract class StoresService {
  private static readonly LOG_TAG = "StoresService";

  public static async getStores(): Promise<any> {
    Logger.log(this.LOG_TAG, "Start request Stores");

    return new Promise(async (resolve, reject) => {
      try {
        const axiosResponse = await HttpClient.get(`shops`);

        if (axiosResponse.status === 200 && axiosResponse.data) {
          Logger.log(this.LOG_TAG, "Stores Data loaded successfully", axiosResponse.data);
          resolve(axiosResponse.data);
          return;
        }

        Logger.error(this.LOG_TAG, "Error Fetching Stores", axiosResponse);
      } catch (error) {
        Logger.error(this.LOG_TAG, "Error Fetching Stores", error);
        reject(error);
      }
    });
  }

  public static async createStore(shopData: IShop): Promise<any> {
    Logger.log(this.LOG_TAG, "Start request createShop", [shopData]);

    return new Promise(async (resolve, reject) => {
      try {
        const requestData: INewShopRequest = {
          shop: shopData.shopReference,
          active: true,
          accessToken: shopData.accessToken,
          withdrawPhoneNumber: shopData.withdrawPhoneNumber,
          hasOwnPaymentSettings: !!shopData.hasOwnPaymentSettings,
        };

        const axiosResponse = await HttpClient.post(`shops`, requestData);

        if (axiosResponse.status === 200 && axiosResponse.data) {
          Logger.log(this.LOG_TAG, "Shop created successfully", axiosResponse.data);
          resolve(axiosResponse.data);
          return;
        }

        Logger.error(this.LOG_TAG, "Error creating Shop", axiosResponse);
      } catch (error) {
        Logger.error(this.LOG_TAG, "Error creating Shop", error);
        reject(error);
      }
    });
  }

  public static async updateStore(storeData: IShop): Promise<any> {
    Logger.log(this.LOG_TAG, "Start request updateShop", [storeData]);

    try {
      const requestData: IEditShopRequest = {
        shop: storeData.shopReference,
        active: storeData.status,
        accessToken: storeData.accessToken,
        hasOwnPaymentSettings: !!storeData.hasOwnPaymentSettings,
        withdrawPhoneNumber: storeData.withdrawPhoneNumber || "",
      };

      const axiosResponse = await HttpClient.put(`shops/${storeData.id}`, requestData);

      if (axiosResponse.status === 200 && axiosResponse.data) {
        Logger.log(this.LOG_TAG, "Shop updated successfully", axiosResponse.data);
        return axiosResponse.data;
      }

      Logger.error(this.LOG_TAG, "Error updating Shop", axiosResponse);

      return Promise.reject(axiosResponse);
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error updating Shop", error);
      return Promise.reject(error);
    }
  }

  public static async getStore(storeId: string): Promise<IShopResponse> {
    Logger.log(this.LOG_TAG, "Start request getShop", [storeId]);

    try {
      const axiosResponse = await HttpClient.get(`shops/${storeId}`);

      if (axiosResponse.status === 200 && axiosResponse.data) {
        Logger.log(this.LOG_TAG, "Shop loaded successfully", axiosResponse.data);
        return axiosResponse.data as IShopResponse;
      }

      Logger.error(this.LOG_TAG, "Error loading Shop", axiosResponse);

      return Promise.reject(axiosResponse);
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error loading Shop", error);
      return Promise.reject(error);
    }
  }

  public static async deleteStore(storeId: string): Promise<any> {
    Logger.log(this.LOG_TAG, "Start request deleteShop");

    try {
      const axiosResponse = await HttpClient.delete(`shops/${storeId}`);

      if (axiosResponse.status === 200) {
        Logger.log(this.LOG_TAG, "Shop deleted successfully", axiosResponse.data);
        return axiosResponse.data;
      }

      Logger.error(this.LOG_TAG, "Error deleting Shop", axiosResponse);

      return Promise.reject(axiosResponse);
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error deleting Shop", error);
      return Promise.reject(error);
    }
  }
}
