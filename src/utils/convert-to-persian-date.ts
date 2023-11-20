import { Num2persian } from "./num2persian";

const months = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند"
];

export const convertToPersianDate = (date:any) => {
  const [ year, month, day ] = date.split('/');
  const persianDate = `${Num2persian(day)}م ${months[Number(month) - 1]} ${Num2persian(year)}`;
  return persianDate;
}