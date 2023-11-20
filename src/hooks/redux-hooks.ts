import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/redux/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;



//! useAppSelector replace with useSelector()
//* Example

// export const vehicleSelector = (state: RootState) => state.vehicle;  -> create in slice component
// const value = useAppSelector(vehicleSelector); -> use in component


//! useAppDispatch replace useDispatch()

//* Example 
// const dispatch = useDispatch() ->   const dispatch = useAppDispatch()



