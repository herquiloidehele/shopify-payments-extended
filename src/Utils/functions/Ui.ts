import moment from "moment";
import { TFunction } from "react-i18next";

import { IPackage } from "../../models";

export const pixel2Rem = (valueInPixel: number): string => `${valueInPixel / 16}rem`;

export function getPassedTime(date: string | Date | number): string {
  return moment(date, "YYYY-MM-DD HH:mm:ss").fromNow();
}

export function formatCurrency(amount?: number | string): string {
  return new Intl.NumberFormat("pt-Pt", {
    style: "currency",
    currency: "MZN",
    useGrouping: true,
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(Number(amount));
}

export const getPackageDuration = (t: TFunction, monthsDuration?: number) => {
  if (!monthsDuration) {
    return "--";
  }

  if (monthsDuration === 1) {
    return `${monthsDuration} / ${t("generics.time.month")}`;
  }

  return `${monthsDuration} / ${t("generics.time.months")}`;
};

export const getPackageName = (packageItem: Partial<IPackage>) => {
  if (!packageItem) {
    return "--";
  }

  return `${packageItem.name} - ${formatCurrency(packageItem.price)}`;
};
