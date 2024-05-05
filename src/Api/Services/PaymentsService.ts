import { AxiosResponse } from "axios";

import { API_ROUTES } from "../../Utils/constants/Routes";
import Logger from "../../Utils/Logger";
import HttpClient from "../HttpClient";

export default abstract class PaymentsService {
  protected static LOG_TAG = "PaymentsService";

  public static getPendingWithdraws() {
    Logger.log(this.LOG_TAG, "Start request Pending Withdraws");

    return new Promise(async (resolve, reject) => {
      try {
        const axiosResponse: AxiosResponse = await HttpClient.get(API_ROUTES.PAYMENTS.FETCH_PENDING_PAYMENTS);
        resolve(axiosResponse.data);
      } catch (error) {
        Logger.error(this.LOG_TAG, "Error Fetching Pending Withdraws", error);
        reject(error);
      }
    });
  }

  static async withdrawPayments() {
    Logger.log(this.LOG_TAG, "Start Withdraw Payments");

    return new Promise(async (resolve, reject) => {
      try {
        const axiosResponse: AxiosResponse = await HttpClient.post(API_ROUTES.PAYMENTS.PROCESS_WITHDRAW);
        resolve(axiosResponse.data);
      } catch (error) {
        Logger.error(this.LOG_TAG, "Error on Withdraw Payments", error);
        reject(error);
      }
    });
  }
}
