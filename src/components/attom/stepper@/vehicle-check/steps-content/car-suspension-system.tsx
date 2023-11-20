// import { CarSuspensionSystemTypes } from "@/Assets/data/carExpert/carSuspensionSystemTypes";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import httpService from "@/services/http-service";
import { FRONT2MESSAGE } from "@/config/url";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import {
  ADD_DESCRIPTION_SUSPENSIONS_SYSTEM,
  ADD_SCORE_SUSPENSIONS_SYSTEM,
  REMOVE_SCORE_SUSPENSIONS_SYSTEM,
} from "@/redux/vehicle-check/result/car-suspensions-system/car-suspensions-system";
import * as Yup from "yup";
import { CarSuspensionSystemTypes } from "src/data/static-data/car-expert/car-suspension-system-types";
import CustomRadioButton from "@/attom/form@/components@/radio-button/radio-button";
import CustomTextarea from "@/attom/form@/components@/textarea/txtarea";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { RootState } from "@/redux/store";

interface CarSuspensionSystemType {
  props: {
    handleNext: () => void;
    handleBack: () => void;
    id: number;
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
  handleClickParameter: {
    e: any;
    type: {
      en: string;
      score: string | number;
    };
  };
}

const CarSuspensionSystem = ({
  handleNext,
  handleBack,
  id,
}: CarSuspensionSystemType["props"]) => {
  // redux datas
  const carFuselage = useAppSelector((state: RootState) => state.carFuselage);
  const carInnerSystem = useAppSelector(
    (state: RootState) => state.carInnerSystem
  );
  const carEngine = useAppSelector((state: RootState) => state.carEngine);
  const carSuspensionsSystem = useAppSelector(
    (state: RootState) => state.carSuspensionsSystem
  );

  // UserInfo
  const { userInfo } = useAppSelector((state: RootState) => state.auth);
  // Formik initial value
  const initialValues: CarSuspensionSystemType["initialValues"] = {
    description: "",
  };
  const innerType = CarSuspensionSystemTypes.map((type) => type);
  innerType.forEach((element) => {
    initialValues[element.name] = carSuspensionsSystem[element.en].score
      ? carSuspensionsSystem[element.en].score
      : "";
  });

  // UseDispatch
  const dispatch = useAppDispatch();

  let carFuselageData = Object.values(carFuselage).map((item) => ({
    title: item.title,
    status: item.status,
  }));
  let carInnerSystemData = Object.values(carInnerSystem).map((item) => ({
    title: item.title,
    status: item.status,
  }));
  let carEngineData = Object.values(carEngine).map((item) => ({
    title: item.title,
    status: item.status,
  }));
  let carSuspensionsSystemData = Object.values(carSuspensionsSystem).map(
    (item) => ({
      title: item.title,
      status: item.status,
    })
  );

  carFuselageData.splice(0, 2);
  carInnerSystemData.splice(0, 2);
  carEngineData.splice(0, 2);
  carSuspensionsSystemData.splice(0, 2);

  const onSubmit = (values: { description: string | null }) => {
    dispatch(ADD_DESCRIPTION_SUSPENSIONS_SYSTEM(values.description));

    const data = [
      {
        category: "امتیاز بدنه و لاستیک",
        score: carFuselage.score,
        description: carFuselage.description,
        data: carFuselageData,
      },
      {
        category: "سیستم برقی و داخلی",
        score: carInnerSystem.score,
        description: carInnerSystem.description,
        data: carInnerSystemData,
      },
      {
        category: "موتور",
        score: carEngine.score,
        description: carEngine.description,
        data: carEngineData,
      },
      {
        category: "سیستم تعلیق",
        score: carSuspensionsSystem.score,
        description: carSuspensionsSystem.description,
        data: carSuspensionsSystemData,
      },
    ];

    const postData = new FormData();

    postData.append("result", JSON.stringify(data));
    postData.append("user_name", userInfo.phone_number);

    httpService
      .post(`${FRONT2MESSAGE}/VehicleCheck/Id/${id}/Set/Result`, postData)
      .then((res) => {
        handleNext();
        toast.success("ثبت نتیجه کارشناسی خودرو با موفقیت انجام شد");
      })
      .catch(() => toast.error("ثبت نتیجه خودرو با مشکل مواجه شد"));
  };

  // ValidattionSchema
  const validationObject: CarSuspensionSystemType["validationObject"] = {};
  innerType.forEach((element) => {
    validationObject[element.name] = Yup.boolean().required();
  });
  const validationSchema = Yup.object(validationObject);

  // Formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  // handle Click for yes answer
  const handleClick = (
    type: CarSuspensionSystemType["handleClickParameter"]["type"]
  ) => {
    dispatch(
      ADD_SCORE_SUSPENSIONS_SYSTEM({
        name: type.en,
        score: type.score,
      })
    );
  };

  // handle Click for no answer
  const handleRemoveClick = (
    type: CarSuspensionSystemType["handleClickParameter"]["type"]
  ) => {
    dispatch(
      REMOVE_SCORE_SUSPENSIONS_SYSTEM({
        name: type.en,
        score: type.score,
      })
    );
  };

  return (
    <div className="lg:w-3/4 mx-auto">
      <h2 className="text-xl text-blue  border-b-2 text-center p-5 font-bold m-auto mt-10 ">
        سیستم تعلیق
      </h2>

      <div className="mt-10 flex flex-col gap-3 ">
        <div className="md:grid hidden grid-cols-6 header-title bg-blue  py-3 px-5 rounded-md text-white sticky xl:top-32 md:top-20 z-10">
          <span className="block text-sm font-medium col-span-4">عنوان</span>
          <span className="block text-sm font-medium mr-2">بله</span>
          <span className="block text-sm font-medium mr-2">خیر</span>
        </div>

        <form onSubmit={formik.handleSubmit}>
          {CarSuspensionSystemTypes.map((type, index) => (
            <CustomRadioButton
              key={index}
              formik={formik}
              name={type.name}
              index={index}
              label={type.name}
              handleClick={() => handleClick(type)}
              handleRemoveClick={() => handleRemoveClick(type)}
              defaultvalue={
                carSuspensionsSystem[type.en].status !== ""
                  ? carSuspensionsSystem[type.en].status
                  : ""
              }
            />
          ))}
          {/*@ts-ignore */}
          <CustomTextarea
            formik={formik}
            name="description"
            label="توضیحات تکمیلی کارشناسی سیستم برقی و داخلی "
            // formClass="w-full"
          />

          <div className="flex md:justify-end justify-between gap-5 items-center">
            <button
              type="button"
              className=" text-center sm:px-8 px-4 flex whitespace-nowrap gap-2 items-center rounded-md w-fit mt-6 py-2 border"
              onClick={handleBack}
            >
              مرحله قبل
            </button>
            <button
              type="submit"
              className="bg-blue  text-white text-center sm:px-16 px-4 flex whitespace-nowrap gap-2 items-center rounded-md w-fit mt-6 py-2"
            >
              ثبت اطلاعات
              {/*@ts-ignore */}
              <ArrowBackIosIcon fontSize="13px" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CarSuspensionSystem;
