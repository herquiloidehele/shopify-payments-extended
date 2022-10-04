import { AxiosResponse } from "axios";

import { IUser } from "../../models";
import { Constants } from "../../Utils/constants/Constants";
import { API_ROUTES } from "../../Utils/constants/Routes";
import Logger from "../../Utils/Logger";
import AccessToken from "../AccessToken";
import HttpClient from "../HttpClient";

export default abstract class AuthService {
  private static LOG_TAG = "AuthService";

  public static isUserAuthenticated(): boolean {
    return !!AccessToken.getToken();
  }

  private static user: IUser | null = null;

  public static validateSession(): Promise<IUser> {
    Logger.log(this.LOG_TAG, "Start validate session");

    return new Promise(async (resolve, reject) => {
      try {
        const axiosResponse: AxiosResponse = await HttpClient.post(API_ROUTES.AUTH.VALIDATE_SESSION);

        Logger.log(this.LOG_TAG, "Validate session response: ", axiosResponse);

        if (axiosResponse.status === 200 && axiosResponse.data) {
          const userData = this.convertLoginData(axiosResponse.data);
          AccessToken.setToken(userData.token, "");
          Logger.log(this.LOG_TAG, "Converted Login Data: ", userData);
          sessionStorage.setItem(Constants.TOKEN_KEY, userData.token);
          this.user = userData;
          resolve(userData);
        }

        Logger.log(this.LOG_TAG, "Invalid session");

        reject(Constants.errors.auth.UNAUTHERIZED);
      } catch (error) {
        Logger.error(this.LOG_TAG, "Error on validate session ", error);
        reject(Constants.errors.auth.UNAUTHERIZED);
      }
    });
  }

  public static async login(shop: string, password: string): Promise<IUser> {
    Logger.log(this.LOG_TAG, "Start login for: ", shop);

    try {
      const axiosResponse: AxiosResponse = await HttpClient.post(API_ROUTES.AUTH.LOGIN, { shop, password });

      Logger.log(this.LOG_TAG, "Login response: ", axiosResponse);

      if (axiosResponse.data && axiosResponse.data) {
        const userData = this.convertLoginData(axiosResponse.data);
        AccessToken.setToken(userData.token, "");
        Logger.log(this.LOG_TAG, "Converted Login Data: ", userData);
        sessionStorage.setItem(Constants.TOKEN_KEY, userData.token);
        this.user = userData;
        return userData;
      }

      throw Constants.errors.auth.INVALID_CREDENTIALS;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error on login ", error);
      throw Constants.errors.auth.INVALID_CREDENTIALS;
    }
  }

  public static logout(): Promise<any> {
    Logger.log(this.LOG_TAG, "Start logout");
    sessionStorage.removeItem(Constants.TOKEN_KEY);
    return HttpClient.post(API_ROUTES.AUTH.LOGOUT);
  }

  private static convertLoginData(data: any): IUser {
    return {
      id: data._id,
      email: data.email,
      name: data.fullName,
      role: data.role,
      token: data.token,
      storeId: data.shop,
    };
  }

  public static get getAuthUser(): IUser | null {
    return this.user;
  }
}
