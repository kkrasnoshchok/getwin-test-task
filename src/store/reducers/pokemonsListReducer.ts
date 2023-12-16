import { createReducer } from '@reduxjs/toolkit'
import { PokeAPI } from 'pokeapi-types'
import { fetchDataFailureAction, fetchDataRequestAction, fetchDataSuccessAction } from '../actions/data'

type PokemonsListReducer = {
    pokemons: PokeAPI.Pokemon[]
    count: number
    nextPageUrl: string
    previousPageUrl: string
    isLoading: boolean
    error: string | null
}

const initialState: PokemonsListReducer = {
    pokemons: [],
    count: 0,
    nextPageUrl: '',
    previousPageUrl: '',
    isLoading: false,
    error: null
}

const pokemonsListReducer = createReducer<PokemonsListReducer>(initialState, (builder) => {
    builder.addCase(fetchDataRequestAction, (state) => {
        state.isLoading = true
        state.error = null
    })
    builder.addCase(fetchDataSuccessAction, (state, action) => {
        state.isLoading = false
        state.count = action.payload.count
        state.pokemons = action.payload.results
    })
    builder.addCase(fetchDataFailureAction, (state, action) => {
        state.isLoading = false
        state.error = action.payload
    })
})

export default pokemonsListReducer
