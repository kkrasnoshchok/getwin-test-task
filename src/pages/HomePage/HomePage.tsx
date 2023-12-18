import React from 'react'
import { Search } from '../../components/Search'
import { TypesSelect } from '../../components/TypesSelect'
import { PokemonsList } from '../../components/PokemonsList'
import styles from './HomePage.module.scss'
import { Pagination } from '../../components/Pagination'

export const HomePage = (): JSX.Element => {
    return (
        <div className={styles.page}>
            <h1>Дослідник покемонів</h1>
            {/* Controls Container */}
            <div className={styles.pageControls}>
                <Pagination />
                <TypesSelect />
                <Search />
            </div>
            <PokemonsList />
        </div>
    )
}
