import { PreviewDetailPropsType } from "./type";

export default function PreviewDetail({
  label,
  value,
}: PreviewDetailPropsType) {
  return (
    <div className="gap-2 border border-[#C4C4C4] relative h-[43px] rounded flex flex-col justify-center px-2">
      <label
        className="bg-white px-2 right-2 -top-2 absolute text-blue"
        style={{ fontSize: "11px" }}
      >
        {label}
      </label>
      <span
        className={`text-sm whitespace-nowrap overflow-hidden w-full truncate ${
          typeof value == "number" ? "text-left" : "text-right"
        }`}
      >
        {value && value != "undefined-undefined" ? value : ""}
      </span>
    </div>
  );
}
