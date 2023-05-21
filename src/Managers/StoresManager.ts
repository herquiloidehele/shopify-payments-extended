import StoresService from "../Api/Services/StoresService";
import { IStore } from "../models";
import Logger from "../Utils/Logger";

export default abstract class StoresManager {
  private static readonly LOG_TAG = "StoresManager";

  public static async getStores(): Promise<IStore[]> {
    Logger.log("StoresManager", "Start request Stores...");

    try {
      const storesResponse = await StoresService.getStores();
      Logger.log("StoresManager", "Stores Data loaded successfully", storesResponse);

      const storesList = storesResponse.map(this.convertDataToStoresList);
      Logger.log("StoresManager", "Stores Data converted successfully", storesList);

      return storesList;
    } catch (error) {
      Logger.error("StoresManager", "Error Fetching Stores", error);
      return Promise.reject(error);
    }
  }

  public static async createStore(shopData: IStore) {
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

  public static async updateStore(storeData: IStore) {
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

  private static convertDataToStoresList(storesResponse: any): IStore {
    return {
      id: storesResponse._id,
      accessToken: storesResponse.accessToken,
      status: storesResponse.active,
      shopReference: storesResponse.shop,
    };
  }
}