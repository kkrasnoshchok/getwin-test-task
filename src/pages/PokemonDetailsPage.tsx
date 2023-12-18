import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/reducers/store'
import { fetchPokemonByName } from '../store/actions/data'
import { FaArrowLeft } from 'react-icons/fa'
import { easeInOut, motion } from 'framer-motion'
import styles from './PokemonDetailsPage.module.scss'
import classNames from 'classnames'

const PokemonDetailsPage: React.FC = () => {
    const params = useParams<{ pokemonSlug: string }>()
    const { pokemon, isLoading, error } = useAppSelector((state) => state.singlePokemonReducer)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (params && params.pokemonSlug) {
            dispatch(fetchPokemonByName({ name: params.pokemonSlug }))
        }
    }, [dispatch, params])
    return (
        <div className={styles.container}>
            <motion.button className={styles.containerBackButton} onClick={() => navigate(-1)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <FaArrowLeft size={24} color="white" />
            </motion.button>
            <motion.div className={styles.containerContent}>
                {isLoading && <h1>Завантаження....</h1>}
                {error && <h1>На жаль не існує покемона з таким імʼям. Будь ласка, спробуйте інакше</h1>}
                {!isLoading && !error && pokemon && (
                    <div style={{width: '100%'}}>
                        <div className={classNames([styles.contentCard, styles.card])}>
                            <div className={styles.cardInfo}>
                                <div className={styles.cardInfoName}>
                                    <h3 className={styles.cardInfoLabel}>Name: </h3>
                                    <h3 className={styles.cardInfoNameValue}>{pokemon.name}</h3>
                                </div>
                                <div className={styles.cardInfoTypes}>
                                    <h3 className={styles.cardInfoLabel}>Types: </h3>
                                    <div className={styles.cardInfoTypesGrid}>
                                        {'types' in pokemon &&
                                            pokemon.types.map(({ type }) => (
                                                <div className={styles.cardInfoTypesGridItem} onClick={() => navigate(`/?type=${type.name}`)} key={type.name}>
                                                    {type.name}
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} height={200} width={200} />
                        </div>
                        <div className={styles.cardInfoMoves}>
                            <h3 className={styles.cardInfoLabel}>Moves:</h3>
                            <div className={styles.cardInfoMovesGrid}>
                                {'moves' in pokemon &&
                                    pokemon.moves.map((move) => (
                                        <div className={styles.cardInfoMovesGridItem} key={move.move.name}>
                                            {move.move.name}
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    )
}

export default PokemonDetailsPage
