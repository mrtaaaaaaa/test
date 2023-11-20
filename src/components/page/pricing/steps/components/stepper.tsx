import { useAppSelector } from "src/hooks/redux-hooks";

const Stepper = () => {
  const { tab } = useAppSelector((state) => state.pricing);
  const Steps = ["اطلاعات تکمیلی خودرو", "وضعیت خودرو", "قیمت خودرو"];

  return (
    <ol className="breadcrumb mb-10">
      {Steps.map((item, index) => (
        <li
          className={` ${
            tab == ++index ? "breadcrumb-level active " : "breadcrumb-level"
          }`}
        >
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
};

export default Stepper;
