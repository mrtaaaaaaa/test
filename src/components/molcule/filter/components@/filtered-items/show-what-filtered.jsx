import { ADD_CARDAMAGE, ADD_COLORS, ADD_MAX_MILEAGE, ADD_MAX_PRICE, ADD_MAX_YEAR_MANUFACTURE, ADD_MIN_MILEAGE, ADD_MIN_PRICE, ADD_MIN_YEAR_MANUFACTURE, REMOVED_FUEL, REMOVED_GEAR, REMOVE_ALL } from "redux/filter/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import { GrClose } from "react-icons/gr"
const ShowWhatFiltered = () => {
  const dataFilter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(REMOVE_ALL(-1));
  };

  const handleRemoveClick = (title) => {
    switch (title) {
      case dataFilter.min_price:
        dispatch(ADD_MIN_PRICE(-1))

      case dataFilter.max_price:
        dispatch(ADD_MAX_PRICE(-1))

      case dataFilter.min_Mileage:
        dispatch(ADD_MIN_MILEAGE(-1))

      case dataFilter.max_Mileage:
        dispatch(ADD_MAX_MILEAGE(-1))

      case dataFilter.min_year_of_manufacture:
        dispatch(ADD_MIN_YEAR_MANUFACTURE(-1))

      case dataFilter.max_year_of_manufacture:
        dispatch(ADD_MAX_YEAR_MANUFACTURE(-1))

      case dataFilter.gear_box_types:
        return dispatch(REMOVED_GEAR([]))

      case dataFilter.fuel_types:
        dispatch(REMOVED_FUEL([]))

      case dataFilter.colors:
        dispatch(ADD_COLORS([]))

      case dataFilter.carDamage:
        dispatch(ADD_CARDAMAGE([]))

      default:
        break;
    }
  }

  return (
    <div className="flex flex-col h-fit justify-between gap-4 border border-blue rounded-md lg:mt-4 p-3">

      <span className="text-center font-bold mb-3 block text-lg ">فیلترهای اعمال شده</span>
      <div className="flex flex-col gap-3">

        <ShowFilteredItem name={dataFilter.min_price} title="حداقل قیمت" conditionalPrice={true} handleRemoveClick={() => handleRemoveClick(dataFilter.min_price)} />
        <ShowFilteredItem name={dataFilter.max_price} title="حداکثر قیمت" conditionalPrice={true} handleRemoveClick={() => handleRemoveClick(dataFilter.max_price)} />
        <ShowFilteredItem name={dataFilter.min_Mileage} title="حداقل کارکرد" conditionaMileage={true} handleRemoveClick={() => handleRemoveClick(dataFilter.min_Mileage)} />
        <ShowFilteredItem name={dataFilter.max_Mileage} title="حداکثر کارکرد" conditionaMileage={true} handleRemoveClick={() => handleRemoveClick(dataFilter.max_Mileage)} />
        <ShowFilteredItem name={dataFilter.colors} title=" رنگ خودرو" handleRemoveClick={() => handleRemoveClick(dataFilter.colors)} />
        <ShowFilteredItem name={dataFilter.gear_box_types} title=" گیربکس" handleRemoveClick={() => handleRemoveClick(dataFilter.gear_box_types)} />
        <ShowFilteredItem name={dataFilter.carDamage} title=" وضعیت فنی بدنه خودرو" handleRemoveClick={() => handleRemoveClick(dataFilter.carDamage)} />
        <ShowFilteredItem name={dataFilter.fuel_types} title=" نوع سوخت" handleRemoveClick={() => handleRemoveClick(dataFilter.fuel_types)} />
        <ShowFilteredItem name={dataFilter.max_year_of_manufacture} title="  حداکثر سال ساخت خوردو" handleRemoveClick={() => handleRemoveClick(dataFilter.max_year_of_manufacture)} />
        <ShowFilteredItem name={dataFilter.min_year_of_manufacture} title="  حداقل سال ساخت خودرو" handleRemoveClick={() => handleRemoveClick(dataFilter.min_year_of_manufacture)} />

        <div className="items-center justify-center flex"  >
          <button
            className="border rounded-full m-auto text-blue  border-blue px-2 py-[.15rem] hover:bg-blue  hover:text-white text-sm"
            onClick={handleClick}
          >
            حذف فیلتر های انجام شده
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowWhatFiltered;

export const ShowFilteredItem = ({ name, title, handleRemoveClick, conditionalPrice, conditionaMileage }) => {

  return (
    <>
      {(name != -1 && name.length !== 0) && <div className="flex justify-between gap-2">
        <div className="flex items-center gap-2">
          <GrClose onClick={() => handleRemoveClick(name)} size={12} className="cursor-pointer" />
          <span>{title}:</span>
        </div>

        <div>
          {Array.isArray(name) ?
            name.map((item) => <span className="font-bold">{item == name.slice(-1) ?
              item : `${item}، `}</span>) :
            conditionalPrice ?
              <span className="font-bold">{(name / 1000000)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
              : <span className="font-bold">{name}</span>}
          {conditionaMileage && <small > کیلومتر </small> || conditionalPrice && <small> میلیون تومان</small>}
        </div>
      </div>
      }
    </>
  )
}