import { AxiosResponse } from "axios";

import { IUser, IUserReport, USER_ROLES } from "../../models";
import { Constants } from "../../Utils/constants/Constants";
import { API_ROUTES } from "../../Utils/constants/Routes";
import Logger from "../../Utils/Logger";
import AccessToken from "../AccessToken";
import HttpClient from "../HttpClient";

export default abstract class AuthService {
  private static LOG_TAG = "AuthService";
  private static user: IUser | null = null;

  public static get getAuthUser(): IUser {
    return this.user || ({} as IUser);
  }

  public static get isUserAdmin(): boolean {
    return this.getAuthUser.role === USER_ROLES.ADMIN;
  }

  public static get isStoreOwner(): boolean {
    return this.getAuthUser.role === USER_ROLES.STORE_OWNER;
  }

  public static isUserAuthenticated(): boolean {
    return !!AccessToken.getToken();
  }

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

  public static async login(userId: string, password: string): Promise<IUser> {
    Logger.log(this.LOG_TAG, "Start login for: ", userId);

    try {
      const axiosResponse: AxiosResponse = await HttpClient.post(API_ROUTES.AUTH.LOGIN, { userId, password });

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

  public static getUsersReport(): Promise<any> {
    Logger.log(this.LOG_TAG, "Start request Users");

    return new Promise(async (resolve, reject) => {
      try {
        const axiosResponse: AxiosResponse = await HttpClient.get(API_ROUTES.AUTH.USERS_LIST);

        if (axiosResponse.status === 200 && axiosResponse.data) {
          const convertdUserReport = this.convertUserReport(axiosResponse.data);
          Logger.log(this.LOG_TAG, "Users Total loaded successfully", convertdUserReport);
          resolve(convertdUserReport);
          return;
        }

        Logger.error(this.LOG_TAG, "Error Fetching Users Total", axiosResponse);
        reject(axiosResponse);
      } catch (error) {
        Logger.error(this.LOG_TAG, "Error Fetching Users Total", error);
        reject(error);
      }
    });
  }

  public static logout(): Promise<any> {
    Logger.log(this.LOG_TAG, "Start request Logout");

    return new Promise(async (resolve, reject) => {
      try {
        const axiosResponse: AxiosResponse = await HttpClient.post(API_ROUTES.AUTH.LOGOUT);

        Logger.log(this.LOG_TAG, "Logout successfully", axiosResponse);

        if (axiosResponse.status === 200) {
          AccessToken.clearToken();
          sessionStorage.removeItem(Constants.TOKEN_KEY);
          AuthService.user = null;
          resolve(true);
          return;
        }

        Logger.error(this.LOG_TAG, "Error on Logout", axiosResponse);
        reject(axiosResponse);
      } catch (error) {
        Logger.error(this.LOG_TAG, "Error on Logout", error);
        reject(error);
      }
    });
  }

  private static convertLoginData(data: any): IUser {
    return {
      id: data._id,
      email: data.email,
      name: data.fullName,
      role: data.role,
      token: data.token,
      storeId: data.shop,
      createdAt: new Date(data.createdAt),
      status: data.status,
    };
  }

  private static convertUserReport(data: any): IUserReport {
    return {
      total: data.totalUsers === 1 ? `${data.totalUsers}` : `${data.totalUsers}`,
      users: data.usersList ? data.usersList.map((user: any) => this.convertLoginData(user)) : [],
    };
  }
}
