export function checkIndexName(index: number | string) {
  let title = "";

  switch (index) {
    case 0:
      title = "اول";
      break;
    case 1:
      title = "دوم";
      break;
    case 2:
      title = "سوم";
      break;
    case 3:
      title = "چهارم";
      break;
    case 4:
      title = "پنجم";
      break;
    case 5:
      title = "ششم";
      break;
    case 6:
      title = "هفتم";
      break;
    case 7:
      title = "هشتم";
      break;
    case 8:
      title = "نهم";
      break;
    case 9:
      title = "دهم";
      break;
    case 10:
      title = "یازدهم";
      break;
    case 11:
      title = "دوازدهم";
      break;
    case 12:
      title = "سیزدهم";
      break;
    case 13:
      title = "چهاردهم";
      break;
    case 14:
      title = "پانزدهم";
      break;
    case 15:
      title = "شانزدهم";
      break;
    case 16:
      title = "هفدهم";
      break;
    case 17:
      title = "هجدهم";
      break;
    case 18:
      title = "نوزدهم";
      break;
    case 19:
      title = "بیستم";
      break;
    default:
      break;
  }

  return title;
}
