import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { ADD_WITH_IMAGE, filterSelector } from "@/redux/filter/filter-slice";
import { Switch } from "@mui/material";

export default function SwtichImageFilter() {
  const { with_image } = useAppSelector(filterSelector);
  const dispatch = useAppDispatch();

  const handleSwithch = () => {
    dispatch(ADD_WITH_IMAGE(!with_image));
  };

  return (
    <div className="flex justify-between items-center border bg-[#F9F9F9] border-[#F9F9F9] p-1 rounded">
      <span className="font-bold">فقط عکس‌دار</span>
      <Switch onChange={handleSwithch} checked={with_image} />
    </div>
  );
}
