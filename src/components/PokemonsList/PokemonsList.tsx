import React, { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import styles from './PokemonsList.module.scss'
import { usePokemonsListData } from '../../utils/hooks/usePokemonsListData'
import { PokemonCard } from '../PokemonCard'

export const PokemonsList = () => {
    const [searchParams] = useSearchParams()
    const {
        pokemonsList: { pokemons, isLoading: pokemonsLoading, error: pokemonsError },
        singleType: { type, isLoading: singleTypeLoading, error: singleTypeError }
    } = usePokemonsListData()

    const renderSingleTypeList = useCallback(
        () => (
            <>
                {singleTypeError && (
                    <h3 className={styles.error}>
                        Сталась помилка з підгруженням данного типу покемонів. Радимо перевірити наявнясть інтернету та перезавантажити сторінку
                    </h3>
                )}
                {singleTypeLoading && <h3 className={styles.loading}>Підгружуються покемони данного типу...</h3>}
                {!singleTypeLoading &&
                    !singleTypeError &&
                    type &&
                    'pokemon' in type &&
                    (type.pokemon.length ? (
                        <div className={styles.pokemonsList}>
                            {type.pokemon.map(({ pokemon }) => (
                                <PokemonCard key={pokemon.name} pokemon={pokemon} />
                            ))}
                        </div>
                    ) : (
                        <h3 className={styles.noPokemonMessage}>Не знайдено покемонів такого типу</h3>
                    ))}
            </>
        ),
        [singleTypeError, type, singleTypeLoading]
    )

    const renderPokemonsList = useCallback(
        () => (
            <>
                {pokemonsError && (
                    <h3 className={styles.error}>Помилка завантаження покемонів. Перевірте своє інтернет зʼєднання та спробуйте перезавантажити сторінку</h3>
                )}
                {pokemonsLoading && <h3 className={styles.loading}>Йде завантаження покемонів...</h3>}
                <div className={styles.pokemonsList}>
                    {!pokemonsLoading && !pokemonsError && pokemons.map((pokemon) => <PokemonCard key={pokemon.name} pokemon={pokemon} />)}
                </div>
            </>
        ),
        [pokemons, pokemonsLoading, pokemonsError]
    )

    return <div className={styles.container}>{searchParams.get('type') ? renderSingleTypeList() : renderPokemonsList()}</div>
}
