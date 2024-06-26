import StoresService from "../Api/Services/StoresService";
import { IShopResponse } from "../ModelDaos";
import { IShop } from "../models";
import Logger from "../Utils/Logger";

export default abstract class StoresManager {
  private static readonly LOG_TAG = "StoresManager";

  public static async getStores(): Promise<IShop[]> {
    Logger.log("StoresManager", "Start request Stores...");

    try {
      const storesResponse = await StoresService.getStores();
      Logger.log(this.LOG_TAG, "Stores Data loaded successfully", storesResponse);

      const storesList = storesResponse.map(this.convertDataToStore);
      Logger.log(this.LOG_TAG, "Stores Data converted successfully", storesList);

      return storesList;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error Fetching Stores", error);
      return Promise.reject(error);
    }
  }

  public static async getStoreById(storeId: string): Promise<IShop> {
    Logger.log(this.LOG_TAG, "Start request getStoreById...");

    try {
      const storeResponse = await StoresService.getStore(storeId);
      Logger.log(this.LOG_TAG, "Store loaded successfully", storeResponse);

      const store = this.convertDataToStore(storeResponse);
      Logger.log(this.LOG_TAG, "Store converted successfully", store);

      return store;
    } catch (error) {
      Logger.error("StoresManager", "Error Fetching Store", error);
      return Promise.reject(error);
    }
  }

  public static async createStore(shopData: IShop) {
    Logger.log(this.LOG_TAG, "Start request createShop...");

    try {
      const createShopResponse = await StoresService.createStore(shopData);
      Logger.log(this.LOG_TAG, "Shop created successfully", createShopResponse);
      return createShopResponse;
    } catch (error) {
      Logger.error("StoresManager", "Error creating Shop", error);
      return Promise.reject(error);
    }
  }

  public static async updateStore(storeData: IShop) {
    Logger.log(this.LOG_TAG, "Start request updateShop...");

    try {
      const updateShopResponse = await StoresService.updateStore(storeData);
      Logger.log(this.LOG_TAG, "Shop updated successfully", updateShopResponse);
      return updateShopResponse;
    } catch (error) {
      Logger.error("StoresManager", "Error updating Shop", error);
      return Promise.reject(error);
    }
  }

  public static async deleteStore(storeId: string) {
    Logger.log(this.LOG_TAG, "Start request deleteShop...");

    try {
      const deleteShopResponse = await StoresService.deleteStore(storeId);
      Logger.log(this.LOG_TAG, "Shop deleted successfully", deleteShopResponse);
      return deleteShopResponse;
    } catch (error) {
      Logger.error("StoresManager", "Error deleting Shop", error);
      return Promise.reject(error);
    }
  }

  public static convertDataToStore(storesResponse: IShopResponse): IShop {
    return {
      id: storesResponse._id,
      shopName: storesResponse.shopName,
      accessToken: storesResponse.accessToken,
      status: storesResponse.active,
      shopReference: storesResponse.shop,
      hasOwnPaymentSettings: storesResponse.hasOwnPaymentSettings,
      withdrawPhoneNumber: storesResponse.withdrawPhoneNumber,
    };
  }
}
