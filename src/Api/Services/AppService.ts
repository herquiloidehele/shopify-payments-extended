import HttpClient from "../HttpClient";

export default abstract class AppService {
  public static getPaymentsList(shop: any) {
    console.log("Start request Payments: ", shop);

    return new Promise(async (resolve, reject) => {
      try {
        const axiosResponse = await HttpClient.get(`payments/shop/${shop}`);

        if (axiosResponse.status === 200) {
          const convertedPayments = this.convertPaymentData(axiosResponse.data);
          console.log("Payment Data loaded successfully", convertedPayments);
          resolve(convertedPayments);
          return;
        }

        console.error("Error Fetching Payments", axiosResponse);
      } catch (error) {
        console.error("Error Fetching Payments", error);
        reject(error);
      }
    });
  }

  public static getShopReport(shop: string) {
    console.log("Start request Shop Report: ", shop);

    return new Promise(async (resolve, reject) => {
      try {
        const axiosResponse = await HttpClient.get(`payments-report/shop/${shop}`);

        if (axiosResponse.status === 200) {
          const convertedPayments = this.convertShopReport(axiosResponse.data);
          console.log("Payment Report Data loaded successfully", convertedPayments);
          resolve(convertedPayments);
          return;
        }

        console.error("Error Fetching Payments Report", axiosResponse);
      } catch (error) {
        console.error("Error Fetching Payments Report", error);
        reject(error);
      }
    });
  }

  public static async savePaymentSettings(data: any) {
    console.log("Start saving payment settings", data);
    const axiosResponse: any = await HttpClient.post("settings", data);
    console.log("Payment settings saved successfully", axiosResponse);
    if (axiosResponse.status === 200) {
      return this.convertPaymentSettings(axiosResponse.data.settings, axiosResponse.data.ACCESS_TOKEN);
    }

    throw new Error("Error saving payment settings");
  }

  public static async getPaymentSettings(shop: any) {
    console.log("Start Fetch payment settings", shop);
    const axiosResponse: any = await HttpClient.get(`settings/shop/${shop}`);
    console.log("Payment settings fetched successfully", axiosResponse);
    if (axiosResponse.status === 200) {
      return this.convertPaymentSettings(axiosResponse.data.settings, axiosResponse.data.ACCESS_TOKEN);
    }

    throw new Error("Error Fetching payment settings");
  }

  private static convertPaymentData(data: any) {
    console.log("Raw Data", data);
    if (data && data.payments) {
      return data.payments.map((payment: any) => {
        return {
          // eslint-disable-next-line no-underscore-dangle
          id: payment._id,
          orderNumber: payment.orderNumber,
          customer: payment.cliente,
          price: payment.valor,
          orderId: payment.orderId,
          status: payment.status,
          createdAt: payment.created_at,
        };
      });
    }
    return [];
  }

  private static convertShopReport(data: any) {
    return {
      payments: this.convertPaymentData(data.payments),
      paymentsCount: `${data.paymentsCount} unit.`,
      paymentsTotal: `${data.paymentsTotal} MZN`,
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
