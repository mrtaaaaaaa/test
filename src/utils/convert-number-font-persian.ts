export const convertToPersianFont = (number: number) => {

  const persianDigits: Record<string, string> = {
    '0': '۰',
    '1': '۱',
    '2': '۲',
    '3': '۳',
    '4': '۴',
    '5': '۵',
    '6': '۶',
    '7': '۷',
    '8': '۸',
    '9': '۹'
  };

  let result = '';
  const numberString = number.toString();

  for (let i = 0; i < numberString.length; i++) {
    if (persianDigits.hasOwnProperty(numberString[i])) {
      result += persianDigits[numberString[i]];
    } else {
      result += numberString[i];
    }
  }

  return result;
}