import { AxiosResponse } from "axios";

import { IUser } from "../../models";
import { Constants } from "../../Utils/constants/Constants";
import { API_ROUTES } from "../../Utils/constants/Routes";
import Logger from "../../Utils/Logger";
import HttpClient from "../HttpClient";

export default abstract class UserService {
  private static LOG_TAG = "UserService";

  public static createUser(userData: IUser): Promise<any> {
    Logger.log(this.LOG_TAG, "Start get user", userData);

    return new Promise(async (resolve, reject) => {
      try {
        const rawData = {
          fullName: userData.name,
          email: userData.email,
          shop: userData.storeId,
          password: userData.password,
          role: userData.role,
          status: userData.status,
          createdAt: userData.createdAt,
        };

        const axiosResponse: AxiosResponse = await HttpClient.post(API_ROUTES.USER.CREATE, rawData);

        Logger.log(this.LOG_TAG, "Get user response: ", axiosResponse);
        if (axiosResponse.status === 200) {
          Logger.log(this.LOG_TAG, "Converted User Data: ", axiosResponse.data);
          resolve(axiosResponse.data);
        }

        Logger.log(this.LOG_TAG, "Get user failed");

        reject(Constants.errors.generic.BAD_REQUEST);
      } catch (error) {
        Logger.error(this.LOG_TAG, "Error on get user ", error);
        reject(Constants.errors.generic.BAD_REQUEST);
      }
    });
  }

  public static updateUser(userData: IUser): Promise<any> {
    Logger.log(this.LOG_TAG, "Start get user", userData);

    return new Promise(async (resolve, reject) => {
      try {
        const rawData = {
          _id: userData.id,
          fullName: userData.name,
          email: userData.email,
          shop: userData.storeId,
          password: userData.password,
          role: userData.role,
          status: userData.status,
          hasOwnPaymentSettings: userData.hasOwnPaymentSettings,
        };

        const axiosResponse: AxiosResponse = await HttpClient.put(API_ROUTES.USER.EDIT, rawData);

        Logger.log(this.LOG_TAG, "Update user response: ", axiosResponse);
        if (axiosResponse.status === 200) {
          resolve(axiosResponse.data);
        }

        Logger.log(this.LOG_TAG, "Get user failed");

        reject(Constants.errors.generic.BAD_REQUEST);
      } catch (error) {
        Logger.error(this.LOG_TAG, "Error on get user ", error);
        reject(Constants.errors.generic.BAD_REQUEST);
      }
    });
  }

  public static deleteUser(userId: string): Promise<any> {
    Logger.log(this.LOG_TAG, "Start remove user", userId);
    return new Promise(async (resolve, reject) => {
      try {
        const axiosResponse: AxiosResponse = await HttpClient.delete(API_ROUTES.USER.DELETE(userId));

        Logger.log(this.LOG_TAG, "Delete user Response", axiosResponse);

        if (axiosResponse.status === 200) {
          resolve(axiosResponse.data);
        }

        Logger.log(this.LOG_TAG, "Erro on delete user");
        reject(Constants.errors.generic.BAD_REQUEST);
      } catch (error) {
        Logger.log(this.LOG_TAG, "Erro on delete user", error);
        reject(Constants.errors.generic.BAD_REQUEST);
      }
    });
  }
}
