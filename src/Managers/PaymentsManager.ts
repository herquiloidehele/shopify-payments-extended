import * as _ from "lodash";

import PaymentsService from "../Api/Services/PaymentsService";
import { IPayment } from "../models";
import Logger from "../Utils/Logger";

class PaymentsManager {
  private readonly LOG_TAG = "PaymentsManager";

  public async getPendingWithdraws() {
    Logger.log(this.LOG_TAG, "Get Pending Withdraws");

    try {
      const pendingWithdraws = await PaymentsService.getPendingWithdraws();
      Logger.log(this.LOG_TAG, "Pending Withdraws Response", [pendingWithdraws, this]);

      const pendingPayments = this.convertPendingWithdraws(pendingWithdraws);

      Logger.log(this.LOG_TAG, "Pending Withdraws converted successfully", [pendingPayments]);

      return pendingPayments;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error on get Pending Withdraws", [error]);
      throw error;
    }
  }

  async withdrawPayments() {
    Logger.log(this.LOG_TAG, "Withdraw Payments");
    try {
      const withdrawPaymentsResponse = await PaymentsService.withdrawPayments();
      Logger.log(this.LOG_TAG, "Withdraws Payments Response", [withdrawPaymentsResponse, this]);

      const withdrawResponseConverted = this.convertWithdrawsPaymentsResponse(withdrawPaymentsResponse);

      Logger.log(this.LOG_TAG, "Withdraws Payments converted successfully", [withdrawPaymentsResponse]);

      return withdrawResponseConverted;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error on get Withdraws Payments", [error]);
      throw error;
    }
  }

  private convertPendingWithdraws(data: any): IPayment[] {
    Logger.log(this.LOG_TAG, "Raw Data", data);
    if (data) {
      const flatData = _.flatMap(data);
      return flatData.map((payment: any) => {
        return {
          id: payment._id,
          orderNumber: payment.orderNumber,
          customer: payment.cliente,
          price: payment.valor,
          orderId: payment.orderId,
          status: payment.status,
          shop: payment.shop,
          createdAt: payment.created_at,
          hasWithdrawed: payment.hasWithdrawed,
        };
      });
    }
    return [];
  }

  private convertWithdrawsPaymentsResponse(withdrawPaymentsResponse: any) {
    Logger.log(this.LOG_TAG, "Raw Data", withdrawPaymentsResponse);
    return {
      successWithdraws: withdrawPaymentsResponse.successWithdraws,
      failedWithdraws: withdrawPaymentsResponse.failedWithdraws,
    };
  }
}

export default new PaymentsManager();
