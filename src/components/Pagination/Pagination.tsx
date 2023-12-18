import React from 'react'
import { motion } from 'framer-motion'
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
            <motion.button
                className={styles.paginationButton}
                onClick={() => setSearchParams([['page', String(Number(searchParams.get('page')) - 1)]])}
                disabled={previousPageDisabled}
                whileHover={{
                    scale: previousPageDisabled ? 1 : 1.05
                }}
                whileTap={{
                    scale: previousPageDisabled ? 1 : 0.95
                }}
            >
                Попередня
            </motion.button>
            <span className={styles.paginationLabel}> Сторінка {Number(searchParams.get('page')) <= 1 ? 1 : searchParams.get('page')} </span>
            <motion.button
                className={styles.paginationButton}
                onClick={() => {
                    const negativePageParam = Number(searchParams.get('page')) < 1 // in case user manually enters -1 page in page url, we set page to 1
                    const updatedPage = negativePageParam ? 1 : Number(searchParams.get('page')) + 1
                    setSearchParams([['page', String(updatedPage)]])
                }}
                disabled={nextPageDisabled}
                whileHover={{
                    scale: nextPageDisabled ? 1 : 1.05
                }}
                whileTap={{
                    scale: nextPageDisabled ? 1 : 0.95
                }}
            >
                Наступна
            </motion.button>
        </div>
    )
}
