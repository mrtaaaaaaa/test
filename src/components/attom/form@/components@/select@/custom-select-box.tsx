
const CustomSelectBox = ({
  data,
  title,
  onChange,
  name,
  inMap,
  label,
  defaultValue,
  customStyle,
  insurnace = false,
  normalData = false,
}: any) => {

  return (
    <div className="flex flex-col gap-3">
      {label && <label>{label && label}</label>}
      <select
        className={`${customStyle} bg-gray-150 text-right ${
          label ? "mt-2" : "mt-0"
        } rounded py-3 px-2 w-full  text-sm cursor-pointer flex justify-between outline-0`}
        onChange={onChange}
        name={name}
        defaultValue={defaultValue}
      >
        
        <option selected hidden>
          {title}
        </option>

        {data.map((item: any) => {
          return (
            <>
              <option
                className="cursor-pointer"
                value={
                  normalData
                    ? item.value
                    : insurnace
                    ? item.name
                    : inMap
                    ? item != "بیشتر از 50"
                      ? item * 1000
                      : -1
                    : item.value || item
                }
                key={item.name || item}
              >
                {normalData
                  ? item.name
                  : insurnace
                  ? item.name
                  : inMap
                  ? item + " کیلومتر "
                  : item.value
                  ? item.value
                  : item.name || item}
              </option>
            </>
          );
        })}
      </select>
    </div>
  );
};

export default CustomSelectBox;
