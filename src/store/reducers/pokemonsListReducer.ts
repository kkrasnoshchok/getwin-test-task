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

const normalisePageUrl = (url?: string) => {
    if (!url) {
        return ''
    }
    const splittedUrl = url.split('&')
    const urlWithoutLimit = splittedUrl[0]
    const limitNumber = Number(splittedUrl[1].split('=')[1])

    if (limitNumber < 20) {
        return `${urlWithoutLimit}&limit=20`
    }
    return url
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
        state.nextPageUrl = normalisePageUrl(action.payload.next)
        state.previousPageUrl = normalisePageUrl(action.payload.previous) ?? ''
    })
    builder.addCase(fetchDataFailureAction, (state, action) => {
        state.isLoading = false
        state.error = action.payload
    })
})

export default pokemonsListReducer
