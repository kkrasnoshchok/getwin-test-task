import { createReducer } from '@reduxjs/toolkit'
import { PokeAPI } from 'pokeapi-types'
import { fetchTypesRequestAction, fetchTypesSuccessAction, fetchTypesFailureAction } from '../actions/actionCreators'

export type TypesReducer = {
    types: PokeAPI.NamedAPIResource[]
    isLoading: boolean
    error: string | null
}

const initialState: TypesReducer = {
    types: [],
    isLoading: false,
    error: null
}

const typesReducer = createReducer<TypesReducer>(initialState, (builder) => {
    builder.addCase(fetchTypesRequestAction, (state) => {
        state.isLoading = true
        state.error = null
    })
    builder.addCase(fetchTypesSuccessAction, (state, action) => {
        state.isLoading = false
        state.types = action.payload.results
    })
    builder.addCase(fetchTypesFailureAction, (state, action) => {
        state.isLoading = false
        state.error = action.payload
    })
})

export default typesReducer
