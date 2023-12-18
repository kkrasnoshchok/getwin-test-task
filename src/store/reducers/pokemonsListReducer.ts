import { createReducer } from '@reduxjs/toolkit'
import { PokeAPI } from 'pokeapi-types'
import { fetchPokemonsFailureAction, fetchPokemonsRequestAction, fetchPokemonsSuccessAction } from '../actions/actionCreators'

export type PokemonsListReducer = {
    pokemons: PokeAPI.NamedAPIResource[]
    count: number
    isLoading: boolean
    error: string | null
}

const initialState: PokemonsListReducer = {
    pokemons: [],
    count: 0,
    isLoading: false,
    error: null
}

const pokemonsListReducer = createReducer<PokemonsListReducer>(initialState, (builder) => {
    builder.addCase(fetchPokemonsRequestAction, (state) => {
        state.isLoading = true
        state.error = null
    })
    builder.addCase(fetchPokemonsSuccessAction, (state, action) => {
        state.isLoading = false
        state.count = action.payload.count
        state.pokemons = action.payload.results
    })
    builder.addCase(fetchPokemonsFailureAction, (state, action) => {
        state.isLoading = false
        state.error = action.payload
    })
})

export default pokemonsListReducer
