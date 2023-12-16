import { createAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { PokeAPI } from 'pokeapi-types'

const API_BASE_URL = 'https://pokeapi.co/api/v2'
const POKEMON_BASE_URL = `${API_BASE_URL}/pokemon`
const TYPE_BASE_URL = `${API_BASE_URL}/type`

export const fetchDataRequestAction = createAction('pokemons/request')
export const fetchDataSuccessAction = createAction<{ results: PokeAPI.Pokemon[]; count: number; next: string; previous: string }>('pokemons/success')
export const fetchDataFailureAction = createAction<string>('pokemons/error')

export const fetchData = ({ page = 1, amount = 20 }: { page?: number; amount?: number }) => {
    return (dispatch: any) => {
        dispatch(fetchDataRequestAction())
        axios
            .get(`${POKEMON_BASE_URL}/?limit=${amount}?offset=${page === 1 ? 0 : page * 20}`)
            .then((response) => {
                const data = response.data
                dispatch(fetchDataSuccessAction(data))
            })
            .catch((error) => {
                dispatch(fetchDataFailureAction(error.message))
            })
    }
}

export const fetchPokemonByNameRequestAction = createAction('singlePokemon/request')
export const fetchPokemonByNameSuccessAction = createAction<PokeAPI.Pokemon>('singlePokemon/success')
export const fetchPokemonByNameFailureAction = createAction<string>('singlePokemon/error')

export const fetchPokemonByName = ({ name }: { name: string }) => {
    return (dispatch: any) => {
        dispatch(fetchPokemonByNameRequestAction())
        axios
            .get(`${POKEMON_BASE_URL}/${name}`)
            .then((response) => {
                const data = response.data
                dispatch(fetchPokemonByNameSuccessAction(data))
            })
            .catch((error) => {
                dispatch(fetchPokemonByNameFailureAction(error.message))
            })
    }
}

export const fetchTypesRequestAction = createAction('types/request')
export const fetchTypesSuccessAction = createAction<{ results: PokeAPI.Type[]; count: number }>('types/success')
export const fetchTypesFailureAction = createAction<string>('types/error')

export const fetchTypes = () => {
    return (dispatch: any) => {
        dispatch(fetchTypesRequestAction())
        axios
            .get(TYPE_BASE_URL)
            .then((response) => {
                const data = response.data
                dispatch(fetchTypesSuccessAction(data))
            })
            .catch((error) => {
                dispatch(fetchTypesFailureAction(error.message))
            })
    }
}

export const fetchSingleTypeRequestAction = createAction('singleType/request')
export const fetchSingleTypeSuccessAction = createAction<PokeAPI.Type>('singleType/success')
export const fetchSingleTypeFailureAction = createAction<string>('singleType/error')

export const fetchSingleType = ({ name }: { name: string }) => {
    return (dispatch: any) => {
        dispatch(fetchSingleTypeRequestAction())
        axios
            .get(`${TYPE_BASE_URL}/${name}`)
            .then((response) => {
                const data = response.data
                dispatch(fetchSingleTypeSuccessAction(data))
            })
            .catch((error) => {
                dispatch(fetchSingleTypeFailureAction(error.message))
            })
    }
}
