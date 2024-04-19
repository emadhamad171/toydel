import { useSelector, type TypedUseSelectorHook, useDispatch } from 'react-redux'
//@ts-ignore
export const useAppDispatch = useDispatch<AppDispatch>
//@ts-ignore
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
