const car_chassis_damaged_type = [
  { value: "هر دو سالم و پلمپ", label: "هر دو سالم و پلمپ" },
  { value: "عقب ضربه خورده", label: "عقب ضربه خورده" },
  { value: "عقب رنگ‌شده", label: "عقب رنگ‌شده" },
  { value: "جلو ضربه‌خورده", label: "جلو ضربه‌خورده" },
  { value: "جلو رنگ‌‌شده", label: "جلو رنگ‌‌شده" },
  {
    value: "عقب ضربه‌‌خورده، جلو رنگ‌نشده",
    label: "عقب ضربه‌‌خورده، جلو رنگ‌نشده",
  },
  {
    value: "عقب رنگ‌شده، جلو ضربه‌خورده",
    label: "عقب رنگ‌شده، جلو ضربه‌خورده",
  },
  { value: "هر دو ضربه‌خورده", label: "هر دو ضربه‌خورده" },
  { value: "هر دو رنگ‌شده", label: "هر دو رنگ‌شده" },
];

const car_damaged_type = [
  { value: "بدون رنگ", label: "بدون رنگ" },
  { value: "بدون رنگ با خط‌ و‌ خش", label: "بدون رنگ با خط‌ و‌ خش" },
  { value: "یک لکه رنگ", label: "یک لکه رنگ" },
  { value: "دو لکه رنگ", label: "دو لکه رنگ" },
  { value: "چند لکه رنگ", label: "چند لکه رنگ" },
  { value: "صافکاری بدون رنگ", label: "صافکاری بدون رنگ" },
  { value: "کامل رنگ", label: "کامل رنگ" },
  { value: "دور رنگ", label: "دور رنگ" },
  { value: "درب صندوق رنگ", label: "درب صندوق رنگ" },
  { value: "درب صندوق تعویض", label: "درب صندوق تعویض" },
  { value: "کاپوت رنگ", label: "کاپوت رنگ" },
  { value: "کاپوت تعویض", label: "کاپوت تعویض" },
];

const fuel_types = [
  { value: "بنزینی", label: "بنزینی" },
  { value: "دوگانه‌سوز (CNG)", label: "دوگانه‌سوز (CNG)" },
  { value: "دوگانه‌سوز (LPG)", label: "دوگانه‌سوز (LPG)" },
  { value: "هیبرید", label: "هیبرید" },
];

const gearbox_type = [
  { value: "اتوماتیک", label: "اتوماتیک" },
  { value: "دستی", label: "دستی" },
];

const technical_diagnosis_type = [
  { value: true, label: "دارد" },
  { value: false, label: "ندارد" },
];

const car_madeaboard_Type = [
  { value: false, label: "داخلی" },
  { value: true, label: "خارجی" },
];

const car_madeaboard_types_pricing = [
  { value: false, label: "ایرانی" },
  { value: true, label: "خارجی" },
];

export {
  fuel_types,
  car_chassis_damaged_type,
  car_damaged_type,
  gearbox_type,
  technical_diagnosis_type,
  car_madeaboard_Type,
  car_madeaboard_types_pricing,
};
