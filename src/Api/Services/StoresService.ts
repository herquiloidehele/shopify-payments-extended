import { IStore } from "../../models";
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

  public static async createStore(shopData: IStore): Promise<any> {
    Logger.log(this.LOG_TAG, "Start request createShop");

    return new Promise(async (resolve, reject) => {
      try {
        const requestData = {
          shop: shopData.shopReference,
          active: true,
          accessToken: shopData.accessToken,
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
}
