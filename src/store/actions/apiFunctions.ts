import axios from 'axios'
import { ITEMS_PER_PAGE, POKEMON_BASE_URL, TYPE_BASE_URL } from '../../resources/api-constants'
import {
    fetchPokemonsRequestAction,
    fetchPokemonsSuccessAction,
    fetchPokemonsFailureAction,
    fetchPokemonByNameRequestAction,
    fetchPokemonByNameSuccessAction,
    fetchPokemonByNameFailureAction,
    fetchTypesRequestAction,
    fetchTypesSuccessAction,
    fetchTypesFailureAction,
    fetchSingleTypeRequestAction,
    fetchSingleTypeSuccessAction,
    fetchSingleTypeFailureAction
} from './actionCreators'
import { AppDispatch } from '../reducers/store'

type FetchPokemonsProps = { page?: number; amount?: number }

export const fetchPokemons = (props: FetchPokemonsProps) => {
    const { page = 1, amount = ITEMS_PER_PAGE } = props
    return (dispatch: AppDispatch) => {
        dispatch(fetchPokemonsRequestAction())
        axios
            .get(`${POKEMON_BASE_URL}/?limit=${amount}&offset=${page === 1 ? 0 : page * 20}`)
            .then((response) => {
                const data = response.data
                dispatch(fetchPokemonsSuccessAction(data))
            })
            .catch((error) => {
                dispatch(fetchPokemonsFailureAction(error.message))
            })
    }
}

type FetchPokemonByNameProps = { name: string }

export const fetchPokemonByName = (props: FetchPokemonByNameProps) => {
    const { name } = props
    return (dispatch: AppDispatch) => {
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

export const fetchTypes = () => {
    return (dispatch: AppDispatch) => {
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

type FetchSingleTypeProps = {
    name: string
}

export const fetchSingleType = (props: FetchSingleTypeProps) => {
    const { name } = props
    return (dispatch: AppDispatch) => {
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
