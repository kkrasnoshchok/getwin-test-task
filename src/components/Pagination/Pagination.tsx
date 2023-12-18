import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppSelector } from '../../store/reducers/store'
import { ITEMS_PER_PAGE } from '../../resources/api-constants'
import styles from './Pagination.module.scss'

export const Pagination = () => {
    const [searchParams, setSearchParams] = useSearchParams([['page', '1']])
    const { count } = useAppSelector((state) => state.pokemonsListReducer)

    if (searchParams.get('type')) {
        return null
    }

    const previousPageDisabled = !!searchParams.get('page') && Number(searchParams.get('page')) <= 1
    const nextPageDisabled = !!searchParams.get('page') && (Number(searchParams.get('page')) + 1) * ITEMS_PER_PAGE >= count

    return (
        <div className={styles.pagination}>
            <button
                className={styles.paginationButton}
                onClick={() => setSearchParams([['page', String(Number(searchParams.get('page')) - 1)]])}
                disabled={previousPageDisabled}
            >
                Попередня
            </button>
            <span className={styles.paginationLabel}> Сторінка {Number(searchParams.get('page')) <= 1 ? 1 : searchParams.get('page')} </span>
            <button
                className={styles.paginationButton}
                onClick={() => {
                    const negativePageParam = Number(searchParams.get('page')) < 1 // in case user manually enters -1 page in page url, we set page to 1
                    const updatedPage = negativePageParam ? 1 : Number(searchParams.get('page')) + 1
                    setSearchParams([['page', String(updatedPage)]])
                }}
                disabled={nextPageDisabled}
            >
                Наступна
            </button>
        </div>
    )
}
