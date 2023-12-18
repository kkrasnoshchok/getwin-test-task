import React from 'react'
import { Search } from '../../components/Search'
import { TypesSelect } from '../../components/TypesSelect'
import { PokemonsList } from '../../components/PokemonsList'
import styles from './HomePage.module.scss'
import { AnimatePresence, motion } from 'framer-motion'
import { Pagination } from '../../components/Pagination'

export const HomePage = (): JSX.Element => {
    return (
        <AnimatePresence>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.page}>
                <motion.h1>Дослідник покемонів</motion.h1>
                {/* Controls Container */}
                <div className={styles.pageControls}>
                    <Pagination />
                    <TypesSelect />
                    <Search />
                </div>
                <PokemonsList />
            </motion.div>
        </AnimatePresence>
    )
}
