import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/reducers/store'
import { TypesReducer } from '../../store/reducers/typesReducer'
import { fetchTypes } from '../../store/actions/apiFunctions'

export const useTypesData = (): TypesReducer => {
    const typesReducer = useAppSelector((state) => state.typesReducer)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if ('types' in typesReducer && !typesReducer.types.length) {
            dispatch(fetchTypes())
        }
    }, [dispatch, typesReducer])

    return typesReducer
}
