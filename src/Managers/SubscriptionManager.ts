import dayjs from "dayjs";

import SubscriptionService from "../Api/Services/SubscriptionService";
import { ISubscriptionResponse } from "../ModelDaos";
import { INewSubscription, ISubscription } from "../models";
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

      const convertedSubscriptions = subscriptions.map(this.convertDataToSubscriptionList);
      Logger.log(this.LOG_TAG, "Subscriptions converted successfully", [convertedSubscriptions]);

      return convertedSubscriptions;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error on get all subscriptions", error);
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

  private convertDataToSubscriptionList(data: ISubscriptionResponse): ISubscription {
    return {
      id: data._id,
      created_at: dayjs(data.created_at),
      validUntil: dayjs(data.validUntil),
      shop: data.shop ? StoresManager.convertDataToStore(data.shop) : {},
      package: data.package ? PackageManager.convertPackageData(data.package) : {},
    };
  }
}

export default new SubscriptionManager();
