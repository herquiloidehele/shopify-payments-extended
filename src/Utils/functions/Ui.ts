import moment from "moment";

export const pixel2Rem = (valueInPixel: number): string => `${valueInPixel / 16}rem`;

export function getPassedTime(date: string | Date | number): string {
  return moment(date, "YYYY-MM-DD HH:mm:ss").fromNow();
}

export function formatCurrency(amount: number | string): string {
  return new Intl.NumberFormat("pt-pt", {
    style: "currency",
    currency: "MZN",
    maximumFractionDigits: 2,
  }).format(Number(amount));
}
