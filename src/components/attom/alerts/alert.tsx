interface AlertProps {
  title: string;
  type: string;
  classes?: string;
}

const Alert = ({ title, type, classes }: AlertProps) => {
  return (
    <div
      className={`${
        type == "error"
          ? "bg-red-100 text-red-500 "
          : `${type == "success" && "bg-green-100 text-green"}`
      } font-bold text-center rounded-md p-4 ${classes}`}
    >
      <span>{title}</span>
    </div>
  );
};

Alert.defaultProps = {
  classes: "xl:col-span-3 col-span-2",
};

export default Alert;
