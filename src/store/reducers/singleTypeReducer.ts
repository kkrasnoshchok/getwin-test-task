import { createReducer } from '@reduxjs/toolkit'
import { PokeAPI } from 'pokeapi-types'
import { fetchSingleTypeRequestAction, fetchSingleTypeSuccessAction, fetchSingleTypeFailureAction } from '../actions/data'

type SingleTypeReducer = {
    type: PokeAPI.Type
    isLoading: boolean
    error: string | null
}

const initialState: SingleTypeReducer = {
    type: {} as PokeAPI.Type,
    isLoading: false,
    error: null
}

const singleTypeReducer = createReducer<SingleTypeReducer>(initialState, (builder) => {
    builder.addCase(fetchSingleTypeRequestAction, (state) => {
        state.isLoading = true
        state.error = null
    })
    builder.addCase(fetchSingleTypeSuccessAction, (state, action) => {
        state.isLoading = false
        state.type = action.payload
    })
    builder.addCase(fetchSingleTypeFailureAction, (state, action) => {
        state.isLoading = false
        state.error = action.payload
    })
})

export default singleTypeReducer
