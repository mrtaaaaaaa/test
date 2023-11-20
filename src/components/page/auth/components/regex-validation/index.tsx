import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

export default function RegexValidation({ formik }: any) {
  const regexValidation = [
    {
      value: "حداقل ۸ کاراکتر",
      condition: formik.values.password.length >= 8,
    },
    {
      value: " حرف انگلیسی کوچک و بزرگ",
      condition:
        formik.values.password && /[a-zA-Z]*$/.test(formik.values.password),
    },
    {
      value: "اعداد و نشانه‌ها: ! @ # $",
      condition:
        formik.values.password && /[0-9!@#$]/.test(formik.values.password),
    },
    {
      value: "بدون فاصله و کاراکتر غیرمجاز",
      condition: formik.values.password && /^\S*$/.test(formik.values.password),
    },
  ];
  return (
    <div className="grid grid-cols-2 gap-2 mt-4 px-2">
      {regexValidation?.map(
        (
          item: {
            value: string;
            condition: any;
          },
          index: number
        ) => {
          return (
            <span
              key={index}
              className="flex items-center text-xs text-gray-600"
            >
              {item.condition ? (
                <AiOutlineCheck color="green" />
              ) : (
                <AiOutlineClose color="red" />
              )}
              {item.value}
            </span>
          );
        }
      )}
    </div>
  );
}
