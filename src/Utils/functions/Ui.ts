import moment from "moment";

export const pixel2Rem = (valueInPixel: number): string => `${valueInPixel / 16}rem`;

export function getPassedTime(date: string | Date | number): string {
  return moment(date, "YYYY-MM-DD HH:mm:ss").fromNow();
}
