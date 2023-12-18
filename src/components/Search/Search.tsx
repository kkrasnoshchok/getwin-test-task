import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Search.module.scss'

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
        <div className={styles.search}>
            <h3 className={styles.searchTitle}>Знайти покемона за імʼям</h3>
            <input
                name="pokemon-search"
                className={styles.searchInput}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Введіть імʼя покемона"
            />
            <button className={styles.searchButton} disabled={!searchValue.length} onClick={onSubmit}>
                Шукати
            </button>
        </div>
    )
}
