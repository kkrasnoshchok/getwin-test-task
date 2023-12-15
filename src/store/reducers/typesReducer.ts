import { createReducer } from '@reduxjs/toolkit'
import { PokeAPI } from 'pokeapi-types'
import { fetchTypesRequestAction, fetchTypesSuccessAction, fetchTypesFailureAction } from '../actions/data'

type typesReducer = {
    types: PokeAPI.Type[]
    isLoading: boolean
    error: string | null
}

const initialState: typesReducer = {
    types: [],
    isLoading: false,
    error: null
}

const typesReducer = createReducer<typesReducer>(initialState, (builder) => {
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
