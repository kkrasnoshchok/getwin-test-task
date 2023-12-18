import { createAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { PokeAPI } from 'pokeapi-types'
import { ITEMS_PER_PAGE, POKEMON_BASE_URL, TYPE_BASE_URL } from '../../resources/api-constants'

export const fetchDataRequestAction = createAction('pokemons/request')
export const fetchDataSuccessAction = createAction<PokeAPI.NamedAPIResourceList>('pokemons/success')
export const fetchDataFailureAction = createAction<string>('pokemons/error')

export const fetchData = ({ page = 1, amount = ITEMS_PER_PAGE }: { page?: number; amount?: number }) => {
    return (dispatch: any) => {
        dispatch(fetchDataRequestAction())
        axios
            .get(`${POKEMON_BASE_URL}/?limit=${amount}&offset=${page === 1 ? 0 : page * 20}`)
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
