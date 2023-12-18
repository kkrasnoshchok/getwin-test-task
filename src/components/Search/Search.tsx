import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Search.module.scss'
import { motion } from 'framer-motion'

export const Search = () => {
    const [searchValue, setSearchValue] = useState('')
    const navigate = useNavigate()
    const onSubmit = useCallback(() => navigate(`/pokemon/${searchValue.trim().toLowerCase()}`), [navigate, searchValue])
    useEffect(() => {
        const keydownHandler = (ev: globalThis.KeyboardEvent) => {
            if (ev.key === 'Enter' && !!(searchValue.length > 0)) {
                onSubmit()
            }
        }
        window.addEventListener('keydown', keydownHandler)

        return () => window.removeEventListener('keydown', keydownHandler)
    }, [onSubmit, searchValue])
    return (
        <motion.div className={styles.search}>
            <motion.h3 className={styles.searchTitle}>Знайти покемона за імʼям</motion.h3>
            <motion.input
                name="pokemon-search"
                className={styles.searchInput}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Введіть імʼя покемона"
            />
            <motion.button
                className={styles.searchButton}
                disabled={!searchValue.length}
                onClick={onSubmit}
                whileHover={{
                    scale: searchValue.length ? 1.05 : 1
                }}
                whileTap={{
                    scale: searchValue.length ? 0.95 : 1
                }}
            >
                Шукати
            </motion.button>
        </motion.div>
    )
}
