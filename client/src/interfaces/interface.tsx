import store from "../store/store"
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export interface IAction {
    type: String;
    payload?: any
}
