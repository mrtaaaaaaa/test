export const regexPersianCharacter = /^[\u0600-\u06FF\u0750-\u077F\uFB8A\u067E\u0686\u06AF\u200C\u200F\s]+$/
export const regexNationalCode = /^[0-9\u06F0-\u06F9]{10}$/ 
export const regexPhoneNumber = /^[09\u06F0\u06F9][0-9\u06F0-\u06F9]{10}$/
export const regexPostalCode = /\b(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}\b/
export const regexAddress = /[\u0600-\u06FF0-9\s،]+/;
export const regexNumber = /^[0-9\u06F0-\u06F9]$/;
export const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
