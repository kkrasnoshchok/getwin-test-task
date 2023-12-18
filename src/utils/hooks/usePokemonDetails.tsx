import { useParams } from 'react-router-dom'
import { fetchPokemonByName } from '../../store/actions/apiFunctions'
import { useAppDispatch, useAppSelector } from '../../store/reducers/store'
import { useEffect } from 'react'
import { SinglePokemonReducer } from '../../store/reducers/singlePokemonReducer'

export const usePokemonDetails = (): SinglePokemonReducer => {
    const params = useParams<{ pokemonSlug: string }>()
    const singlePokemonReducer = useAppSelector((state) => state.singlePokemonReducer)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (params && params.pokemonSlug) {
            dispatch(fetchPokemonByName({ name: params.pokemonSlug }))
        }
    }, [dispatch, params])

    return singlePokemonReducer
}
