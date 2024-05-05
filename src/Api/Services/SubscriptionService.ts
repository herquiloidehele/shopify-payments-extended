import { ISubscriptionResponse } from "../../ModelDaos";
import { INewSubscription, INewUserSubscription } from "../../models";
import { API_ROUTES } from "../../Utils/constants/Routes";
import Logger from "../../Utils/Logger";
import HttpClient from "../HttpClient";

class SubscriptionService {
  private readonly LOG_TAG = "SubscriptionService";

  public async fetchAllSubscription() {
    Logger.log(this.LOG_TAG, "Fetch all subscription");

    try {
      const { data, status } = await HttpClient.get(API_ROUTES.SUBSCRIPTIONS.LIST);

      if (status !== 200) {
        Logger.error(this.LOG_TAG, "Error on fetch all subscription", data);
        throw new Error("Error on fetch all subscription");
      }

      return data as ISubscriptionResponse[];
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error on fetch all subscription", error);
      throw error;
    }
  }

  public async fetchSubscriptionByStoreId(storeId: string) {
    Logger.log(this.LOG_TAG, "Fetch subscription by store ID", storeId);

    try {
      const { data, status } = await HttpClient.get(API_ROUTES.SUBSCRIPTIONS.LIST_BY_STORE(storeId));

      if (status !== 200) {
        Logger.error(this.LOG_TAG, "Error on fetch subscription by store ID", data);
        throw new Error("Error on fetch subscription by store ID");
      }

      return data as ISubscriptionResponse[];
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error on fetch subscription by store ID", error);
      throw error;
    }
  }

  public async createSubscription(data: INewSubscription) {
    Logger.log(this.LOG_TAG, "Create subscription", data);

    try {
      const { data: responseData, status } = await HttpClient.post(API_ROUTES.SUBSCRIPTIONS.CREATE, data);

      if (status !== 200) {
        Logger.error(this.LOG_TAG, "Error on create subscription", responseData);
        throw new Error("Error on create subscription");
      }

      return !!responseData;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error on create subscription", error);
      throw error;
    }
  }

  public async createUserSubscription(data: INewUserSubscription) {
    Logger.log(this.LOG_TAG, "Create subscription", data);

    try {
      const { data: responseData, status } = await HttpClient.post(API_ROUTES.SUBSCRIPTIONS.CREATE_USER, data);

      if (status !== 200) {
        Logger.error(this.LOG_TAG, "Error on create subscription", responseData);
        throw new Error("Error on create subscription");
      }

      return !!responseData;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error on create subscription", error);
      throw error;
    }
  }

  public async deleteSubscription(subscriptionId: string) {
    Logger.log(this.LOG_TAG, "Delete subscription", subscriptionId);

    try {
      const { data: responseData, status } = await HttpClient.delete(API_ROUTES.SUBSCRIPTIONS.DELETE(subscriptionId));

      if (status !== 200) {
        Logger.error(this.LOG_TAG, "Error on delete subscription", responseData);
        throw new Error("Error on delete subscription");
      }

      return !!responseData;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error on delete subscription", error);
      throw error;
    }
  }

  public async fetchCurrentSubscription(storeId: string) {
    Logger.log(this.LOG_TAG, "Fetch current subscription");

    try {
      const { data, status } = await HttpClient.post(API_ROUTES.SUBSCRIPTIONS.CURRENT, { shopId: storeId });

      if (status !== 200) {
        Logger.error(this.LOG_TAG, "Error on fetch current subscription", data);
        throw new Error("Error on fetch current subscription");
      }

      return data as ISubscriptionResponse;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error on fetch current subscription", error);
      throw error;
    }
  }
}

export default new SubscriptionService();
