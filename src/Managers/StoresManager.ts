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

  private static convertDataToStoresList(storesResponse: any): IStore {
    return {
      id: storesResponse._id,
      accessToken: storesResponse.accessToken,
      status: storesResponse.active,
      shopReference: storesResponse.shop,
    };
  }
}
