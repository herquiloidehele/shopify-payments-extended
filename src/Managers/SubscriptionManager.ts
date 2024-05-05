import dayjs from "dayjs";

import SubscriptionService from "../Api/Services/SubscriptionService";
import { ISubscriptionResponse } from "../ModelDaos";
import { INewSubscription, INewUserSubscription, ISubscription } from "../models";
import Logger from "../Utils/Logger";
import PackageManager from "./PackageManager";
import StoresManager from "./StoresManager";

class SubscriptionManager {
  private readonly LOG_TAG = "SubscriptionManager";

  public async getSubscriptions(): Promise<ISubscription[]> {
    Logger.log(this.LOG_TAG, "Get all subscriptions");

    try {
      const subscriptions = await SubscriptionService.fetchAllSubscription();
      Logger.log(this.LOG_TAG, "Subscriptions Response", [subscriptions]);

      const convertedSubscriptions = subscriptions.map(this.convertDataToSubscription);
      Logger.log(this.LOG_TAG, "Subscriptions converted successfully", [convertedSubscriptions]);

      return convertedSubscriptions;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error on get all subscriptions", error);
      return Promise.reject(error);
    }
  }

  public async getSubscriptionByStoreId(storeId?: string): Promise<ISubscription[]> {
    Logger.log(this.LOG_TAG, "Get all subscriptions by store ID", storeId);

    try {
      if (!storeId) {
        return Promise.reject(new Error("Store ID is required"));
      }

      const subscriptions = await SubscriptionService.fetchSubscriptionByStoreId(storeId);
      Logger.log(this.LOG_TAG, "Subscriptions Response", [subscriptions]);

      const convertedSubscriptions = subscriptions.map(this.convertDataToSubscription);
      Logger.log(this.LOG_TAG, "Subscriptions converted successfully", [convertedSubscriptions]);

      return convertedSubscriptions;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error on get all subscriptions by store ID", error);
      return Promise.reject(error);
    }
  }

  public async createSubscription(subscriptionData: INewSubscription): Promise<boolean> {
    Logger.log(this.LOG_TAG, "Create Subscription", subscriptionData);

    try {
      const response = await SubscriptionService.createSubscription(subscriptionData);
      Logger.log(this.LOG_TAG, "Subscription Created", [response]);

      return true;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error on create subscription", error);
      return Promise.reject(error);
    }
  }

  public async createUserSubscription(userSubscription: INewUserSubscription): Promise<boolean> {
    Logger.log(this.LOG_TAG, "Create Subscription", [userSubscription]);

    try {
      const response = await SubscriptionService.createUserSubscription(userSubscription);
      Logger.log(this.LOG_TAG, "Subscription Created", [response]);

      return true;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error on create subscription", error);
      return Promise.reject(error);
    }
  }

  public async deleteSubscription(subscriptionId: string): Promise<boolean> {
    Logger.log(this.LOG_TAG, "Delete Subscription", subscriptionId);

    try {
      const response = await SubscriptionService.deleteSubscription(subscriptionId);
      Logger.log(this.LOG_TAG, "Subscription Deleted", [response]);

      return true;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error on delete subscription", error);
      return Promise.reject(error);
    }
  }

  public async fetchCurrentSubscription(storeId?: string): Promise<ISubscription> {
    Logger.log(this.LOG_TAG, "Fetch current subscription");

    try {
      if (!storeId) {
        return Promise.reject(new Error("Store ID is required"));
      }

      const subscription = await SubscriptionService.fetchCurrentSubscription(storeId);
      Logger.log(this.LOG_TAG, "Current Subscription Response", [subscription]);

      const convertedSubscription = this.convertDataToSubscription(subscription);
      Logger.log(this.LOG_TAG, "Current Subscription converted successfully", [convertedSubscription]);

      return convertedSubscription;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error on get current subscription", error);
      return Promise.reject(error);
    }
  }

  private convertDataToSubscription(data: ISubscriptionResponse): ISubscription {
    return {
      id: data._id,
      created_at: dayjs(data.created_at),
      validUntil: dayjs(data.validUntil),
      shop: data.shop ? StoresManager.convertDataToStore(data.shop) : {},
      package: data.package ? PackageManager.convertPackageData(data.package) : {},
      isActive: dayjs(data.validUntil).isAfter(dayjs()),
    };
  }
}

export default new SubscriptionManager();
