import { createReducer } from '@reduxjs/toolkit'
import { PokeAPI } from 'pokeapi-types'
import { fetchPokemonByNameFailureAction, fetchPokemonByNameRequestAction, fetchPokemonByNameSuccessAction } from '../actions/actionCreators'

export type SinglePokemonReducer = {
    pokemon: PokeAPI.Pokemon
    isLoading: boolean
    error: string | null
}

const initialState: SinglePokemonReducer = {
    pokemon: {} as PokeAPI.Pokemon,
    isLoading: false,
    error: null
}

const singlePokemonReducer = createReducer<SinglePokemonReducer>(initialState, (builder) => {
    builder.addCase(fetchPokemonByNameRequestAction, (state) => {
        state.isLoading = true
        state.error = null
    })
    builder.addCase(fetchPokemonByNameSuccessAction, (state, action) => {
        state.isLoading = false
        state.pokemon = action.payload
    })
    builder.addCase(fetchPokemonByNameFailureAction, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.pokemon = {} as PokeAPI.Pokemon
    })
})

export default singlePokemonReducer
