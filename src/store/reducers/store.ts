import { combineReducers, configureStore } from '@reduxjs/toolkit'
import data from './data'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

const rootReducer = combineReducers({
    data
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({})
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
