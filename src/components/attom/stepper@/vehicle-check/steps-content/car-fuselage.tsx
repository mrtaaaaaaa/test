import {
  ADD_CARFUSELAGE,
  ADD_DESCRIPTION_CARFUSELAGE,
  ADD_SCORE_CARFUSELAGE,
} from "@/redux/vehicle-check/result/car-fuselage/car-fuselage-slice";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomTextarea from "@/attom/form@/components@/textarea/txtarea";
import { SelectBox } from "@/attom/form@/components@/select@/select-box";
import {
  CarFuselageTypes,
  Tire,
} from "src/data/static-data/car-expert/car-fuselage-types";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { RootState } from "@/redux/store";

interface CarFuselageType {
  props: {
    handleNext: () => void;
  };
  values: {
    description: string | null;
  };

  validationObject: {
    [name: string]: any;
  };
  initialValues: {
    [init: string]: any;
    description: string | null;
  };
}

const Carfuselage = ({ handleNext }: CarFuselageType["props"]) => {
  // Get carFuselage System data for default value
  const carFuselageData = useAppSelector(
    (state: RootState) => state.carFuselage
  );

  const initialValues: CarFuselageType["initialValues"] = {
    description: carFuselageData.description ? carFuselageData.description : "",
  };
  const dispatch = useAppDispatch();
  const innerType = CarFuselageTypes.map((type) => type);
  const tireType = Tire.map((type) => type);

  innerType.forEach((element) => {
    initialValues[element.name] = carFuselageData[element.enName].status
      ? carFuselageData[element.enName].status
      : "";
  });

  tireType.forEach((element) => {
    initialValues[element.name] = carFuselageData[element.enName].status
      ? carFuselageData[element.enName].status
      : "";
  });

  const onSubmit = (values: { description: string | null }) => {
    let sumOfValues = 0;

    const entries = Object.entries(carFuselageData);
    const slicedEntries = entries.slice(2);
    const newObj = Object.fromEntries(slicedEntries);

    const scores = Object.keys(newObj).map(
      (key) => (sumOfValues += +newObj[key].score)
    );

    dispatch(ADD_SCORE_CARFUSELAGE(sumOfValues));
    dispatch(ADD_DESCRIPTION_CARFUSELAGE(values.description));
    handleNext();
  };

  const validationObject: CarFuselageType["validationObject"] = {};
  innerType.forEach((element) => {
    validationObject[element.name] = Yup.string()
      .required(`${element.name} الزامی است.`)
      .matches(/^[\u0600-\u06FF\s]+$/, "مقدار وارد شده صحیح نیست.");
  });
  tireType.forEach((element) => {
    validationObject[element.name] = Yup.string().required(
      `${element.name} الزامی است.`
    );
  });

  const validationSchema = Yup.object(validationObject);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const handeClick = (e: any, type: { enName: string }) => {
    let score = e.target.getAttribute("data-score");
    let value = e.target.getAttribute("data-value");

    dispatch(
      ADD_CARFUSELAGE({
        title: type.enName,
        status: value,
        score: score,
      })
    );
  };

  return (
    <div className="lg:w-3/4 mx-auto">
      <h2 className="text-xl text-blue border-b-2 text-center p-5 font-bold m-auto my-10 ">
        بدنه
      </h2>

      <form onSubmit={formik.handleSubmit}>
        <div className="grid md:grid-cols-2 gap-8">
          {CarFuselageTypes.map((type, index) => (
            <SelectBox
              handleClick={(e: any) => handeClick(e, type)}
              options={type.options}
              formik={formik}
              name={type.name}
              label={`${index + 1} -${type.name}`}
            />
          ))}
        </div>
        <h2 className="text-xl text-blue border-b-2 text-center p-5 font-bold m-auto my-10 ">
          لاستیک
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {Tire.map((type, index) => (
            <SelectBox
              handleClick={(e: any) => handeClick(e, type)}
              options={type.options}
              formik={formik}
              name={type.name}
              label={`${index + 1} -${type.name}`}
            />
          ))}
        </div>
        <div className="mt-5">
          {/* @ts-ignore */}
          <CustomTextarea
            formik={formik}
            name="description"
            label="توضیحات تکمیلی کارشناسی  بدنه و لاستیک  "
            // formClass="w-full border-t-2 "
          />
        </div>
        <button
          type="submit"
          className="bg-blue text-white text-center px-16 flex whitespace-nowrap gap-2 items-center rounded-md w-fit mt-6 py-2 mr-auto"
        >
          مرحله بعد
          {/*@ts-ignore */}
          <ArrowBackIosIcon fontSize="13px" />
        </button>
      </form>
    </div>
  );
};
export default Carfuselage;
