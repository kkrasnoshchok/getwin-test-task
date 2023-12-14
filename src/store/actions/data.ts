import { createAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { PokeAPI } from 'pokeapi-types'

export const fetchDataRequestAction = createAction('pokemons/request')
export const fetchDataSuccessAction = createAction<{ results: PokeAPI.Pokemon[]; count: number; next: string; previous: string }>('pokemons/success')
export const fetchDataFailureAction = createAction<string>('pokemons/error')

export const fetchData = ({ specPage, amount = 20 }: { specPage?: string; amount?: number }) => {
    return (dispatch: any) => {
        dispatch(fetchDataRequestAction())
        axios
            .get(specPage ?? `https://pokeapi.co/api/v2/ability/?limit=${amount}`)
            .then((response) => {
                const data = response.data
                dispatch(fetchDataSuccessAction(data))
            })
            .catch((error) => {
                dispatch(fetchDataFailureAction(error.message))
            })
    }
}
