import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/reducers/store'
import { fetchPokemons, fetchSingleType } from '../../store/actions/apiFunctions'
import { useSearchParams } from 'react-router-dom'
import { PokemonsListReducer } from '../../store/reducers/pokemonsListReducer'
import { SingleTypeReducer } from '../../store/reducers/singleTypeReducer'

type HookOutput = {
    pokemonsList: PokemonsListReducer
    singleType: SingleTypeReducer
}

export const usePokemonsListData = (): HookOutput => {
    const dispatch = useAppDispatch()
    const pokemonsList = useAppSelector((state) => state.pokemonsListReducer)
    const singleType = useAppSelector((state) => state.singleTypeReducer)

    const [searchParams] = useSearchParams([['page', '1']])

    useEffect(() => {
        if (searchParams.has('type')) {
            const typeParam = searchParams.get('type')
            if (typeParam) {
                dispatch(fetchSingleType({ name: typeParam }))
            }
        }
        if (searchParams.has('page')) {
            const pageParam = searchParams.get('page')
            if (pageParam) {
                const page = Number(pageParam) <= 1 ? 1 : Number(pageParam)
                dispatch(fetchPokemons({ page }))
            }
        }
    }, [searchParams, dispatch])

    return { pokemonsList, singleType }
}
