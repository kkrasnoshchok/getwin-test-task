import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import classNames from 'classnames'
import styles from './PokemonDetailsPage.module.scss'
import { API_BASE_IMAGE_URL } from '../../resources/api-constants'
import { usePokemonDetails } from '../../utils/hooks/usePokemonDetails'

export const PokemonDetailsPage = (): JSX.Element => {
    const { pokemon, isLoading, error } = usePokemonDetails()
    const navigate = useNavigate()
    return (
        <div className={styles.container}>
            <button className={styles.containerBackButton} onClick={() => navigate(-1)}>
                <FaArrowLeft size={24} color="white" />
            </button>
            <div className={styles.containerContent}>
                {isLoading && <h1>Завантаження....</h1>}
                {error && <h1>На жаль не існує покемона з таким імʼям. Будь ласка, спробуйте інакше</h1>}
                {!isLoading && !error && pokemon && (
                    <div className={styles.contentCard}>
                        <div className={styles.card}>
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
                            <img src={`${API_BASE_IMAGE_URL}/${pokemon.id}.png`} height={200} width={200} />
                        </div>
                        <div className={styles.cardInfoMoves}>
                            <h3 className={styles.cardInfoLabel}>Moves:</h3>
                            <div className={styles.cardInfoMovesGrid}>
                                {'moves' in pokemon &&
                                    pokemon.moves.map(({ move }) => (
                                        <div className={styles.cardInfoMovesGridItem} key={move.name}>
                                            {move.name}
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
