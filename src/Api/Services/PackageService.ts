import { IPackageResponse } from "../../ModelDaos";
import { API_ROUTES } from "../../Utils/constants/Routes";
import Logger from "../../Utils/Logger";
import HttpClient from "../HttpClient";

class PackageService {
  private readonly LOG_TAG = "PackageService";

  public async getPackages(): Promise<IPackageResponse[]> {
    Logger.log(this.LOG_TAG, "Get Packages");

    try {
      const { data, status } = await HttpClient.get(API_ROUTES.PACKAGES.LIST);

      if (status !== 200 || !data) {
        Logger.error(this.LOG_TAG, "Error on get packages", [data]);
        throw new Error("Error on get packages");
      }

      return data as IPackageResponse[];
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error on get packages", error);
      throw error;
    }
  }
}

export default new PackageService();
