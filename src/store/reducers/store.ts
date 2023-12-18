import { combineReducers, configureStore } from '@reduxjs/toolkit'
import pokemonsListReducer from './pokemonsListReducer'
import singlePokemonReducer from './singlePokemonReducer'
import singleTypeReducer from './singleTypeReducer'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import typesReducer from './typesReducer'


const rootReducer = combineReducers({ pokemonsListReducer, singlePokemonReducer, typesReducer, singleTypeReducer })

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({})
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
