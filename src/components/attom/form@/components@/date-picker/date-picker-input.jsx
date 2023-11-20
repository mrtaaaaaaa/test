import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { SET_BIRTHDAY } from "@/redux/edit-personal-info/edit-personal-info-slice";
import { FormControl, FormHelperText } from "@mui/material";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";

const DatePickerInput = ({ formik, name, nameObject, label, defaultValue }) => {
  const { data } = useAppSelector((state) => state.editPersonalInfo);

  const dispatch = useAppDispatch();

  const handleDate = (date) => {
    if (data.phone_number) {
      dispatch(
        SET_BIRTHDAY({
          day: date.day,
          month: date.month.number,
          year: date.year,
        })
      );
    }

    const nameArray = nameObject && Object.keys(nameObject);

    if (formik) {
      if (nameObject) {
        let formikValue = formik.values;

        formik.setFieldValue(nameArray[0], date.day);
        formik.setFieldValue(nameArray[1], date.month.number);
        formik.setFieldValue(nameArray[2], date.year);
      } else if (name) {
        formik.setFieldValue(
          name,
          `${date.day}/${date.month.number}/${date.year}`
        );
      } else {
        formik.setFieldValue("birth_date_day", date.day);
        formik.setFieldValue("birth_date_month", date.month.number);
        formik.setFieldValue("birth_date_year", date.year);
      }
    }
  };

  return (
    <FormControl className="relative">
      <span
        className="absolute right-3 -top-2 bg-white pr-2 pl-6 text-gray"
        style={{ fontSize: "12px" }}
      >
        {label ? label : "   تاریخ تولد"}
      </span>
      <DatePicker
        className="w-full"
        render={(value, openCalendar) => (
          <input
            onClick={openCalendar}
            placeholder="مثال: ۱۳۷۸/۱۱/۲۳"
            className={`border ${
              formik?.errors[name] && formik?.touched[name]
                ? "border-red-500"
                : "border-[#C4C4C4]"
            }  text-right rounded py-2 px-2 w-full md:truncate text-sm h-[43px] ltr outline-none`}
            value={defaultValue? defaultValue :value ? value : formik.values.birthday}
            defaultValue={defaultValue ? defaultValue :formik.values.birthday }
          />
        )}
        name={name ? name : "birthday"}
        calendar={persian}
        defaultValue={"12/05/2022"}
        locale={persian_fa}
        onChange={handleDate}
      />

      {formik?.errors[name] && formik?.touched[name] && (
        <FormHelperText
          className="p-0"
          sx={{
            marginLeft: 0,
            fontFamily: "IranSans",
            marginRight: 0,
            textAlign: "right",
            color: "#D90201",
          }}
        >
          {formik?.errors[name]}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default DatePickerInput;
