import { AxiosResponse } from "axios";

import { IPayment } from "../../models";
import Logger from "../../Utils/Logger";
import HttpClient from "../HttpClient";
import AuthService from "./AuthService";

export default abstract class AppService {
  protected static LOG_TAG = "AppService";

  public static getPaymentsList(shop: any) {
    Logger.log(this.LOG_TAG, "Start request Payments: ", shop);

    return new Promise(async (resolve, reject) => {
      try {
        let axiosResponse: AxiosResponse;

        if (AuthService.isUserAdmin) {
          axiosResponse = await HttpClient.get(`payments/all`);
        } else {
          axiosResponse = await HttpClient.get(`payments/shop/${shop}`);
        }

        if (axiosResponse.status === 200) {
          const convertedPayments = this.convertPaymentData(axiosResponse.data);
          Logger.log(this.LOG_TAG, "Payment Data loaded successfully", convertedPayments);
          resolve(convertedPayments);
          return;
        }

        Logger.error(this.LOG_TAG, "Error Fetching Payments", axiosResponse);
      } catch (error) {
        Logger.error(this.LOG_TAG, "Error Fetching Payments", error);
        reject(error);
      }
    });
  }

  public static getShopReport() {
    Logger.log(this.LOG_TAG, "Start request Shop Report");

    return new Promise(async (resolve, reject) => {
      try {
        let axiosResponse;

        if (AuthService.isUserAdmin) {
          axiosResponse = await HttpClient.get(`payments/all`);
        } else {
          const shop = AuthService.getAuthUser?.storeId || "";
          axiosResponse = await HttpClient.get(`payments-report/shop/${shop}`);
        }

        if (axiosResponse.status === 200) {
          const convertedPayments = this.convertShopReport(axiosResponse.data);
          Logger.log(this.LOG_TAG, "Payment Report Data loaded successfully", convertedPayments);
          resolve(convertedPayments);
          return;
        }

        Logger.error(this.LOG_TAG, "Error Fetching Payments Report", axiosResponse);
      } catch (error) {
        Logger.error(this.LOG_TAG, "Error Fetching Payments Report", error);
        reject(error);
      }
    });
  }

  public static async savePaymentSettings(data: any) {
    Logger.log(this.LOG_TAG, "Start saving payment settings", data);
    const axiosResponse: any = await HttpClient.post("settings", data);
    Logger.log(this.LOG_TAG, "Payment settings saved successfully", axiosResponse);
    if (axiosResponse.status === 200) {
      return this.convertPaymentSettings(axiosResponse.data.settings, axiosResponse.data.ACCESS_TOKEN);
    }

    throw new Error("Error saving payment settings");
  }

  public static async getPaymentSettings(shop: any) {
    Logger.log(this.LOG_TAG, "Start Fetch payment settings", shop);
    const axiosResponse: any = await HttpClient.get(`settings/shop/${shop}`);
    Logger.log(this.LOG_TAG, "Payment settings fetched successfully", axiosResponse);
    if (axiosResponse.status === 200) {
      return this.convertPaymentSettings(axiosResponse.data.settings, axiosResponse.data.ACCESS_TOKEN);
    }

    throw new Error("Error Fetching payment settings");
  }

  private static convertPaymentData(data: any): IPayment[] {
    Logger.log(this.LOG_TAG, "Raw Data", data);
    if (data) {
      return data.map((payment: any) => {
        return {
          // eslint-disable-next-line no-underscore-dangle
          id: payment._id,
          orderNumber: payment.orderNumber,
          customer: payment.cliente,
          price: payment.valor,
          orderId: payment.orderId,
          status: payment.status,
          shop: payment.shop,
          createdAt: payment.created_at,
        };
      });
    }
    return [];
  }

  private static convertShopReport(data: any) {
    return {
      payments: this.convertPaymentData(data.payments),
      paymentsCount: data.paymentsCount,
      paymentsTotal: data.paymentsTotal,
    };
  }

  private static convertPaymentSettings(data: any, accessTooken: any) {
    if (!data) {
      return {
        apiKey: "",
        publicKey: "",
        origin: "",
        host: "",
        serviceProviderCode: "",
        accessToken: "",
      };
    }

    return {
      apiKey: data.MPESA_API_KEY,
      publicKey: data.MPESA_PUBLIC_KEY,
      origin: data.MPESA_ORIGIN,
      host: data.MPESA_API_HOST,
      serviceProviderCode: data.MPESA_SERVICE_PROVIDER_CODE,
      accessToken: accessTooken,
      shop: data.SHOP,
    };
  }
}
