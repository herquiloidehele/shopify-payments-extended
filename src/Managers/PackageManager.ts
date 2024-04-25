import PackageService from "../Api/Services/PackageService";
import { IPackageResponse } from "../ModelDaos";
import { IPackage } from "../models";
import Logger from "../Utils/Logger";

class PackageManager {
  private readonly LOG_TAG = "PackageManager";

  public async getPackages() {
    Logger.log(this.LOG_TAG, "Get Packages");

    try {
      const packagesResponse = await PackageService.getPackages();
      Logger.log(this.LOG_TAG, "Packages Response", [packagesResponse, this]);

      const packages = packagesResponse.map(this.convertPackageData);

      Logger.log(this.LOG_TAG, "Packages converted successfully", [packages]);

      return packages;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error on get packages", [error]);
      throw error;
    }
  }

  public convertPackageData(packageData: IPackageResponse): IPackage {
    return {
      id: packageData._id,
      description: packageData.description,
      image: packageData.image,
      name: packageData.name,
      price: packageData.price,
      monthsDuration: packageData.monthsDuration,
    };
  }
}

export default new PackageManager();
