import React, { useCallback, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/reducers/store'
import { fetchData, fetchSingleType } from '../../store/actions/data'
import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './PokemonsList.module.scss'
import { motion } from 'framer-motion'

export const PokemonsList = () => {
    const dispatch = useAppDispatch()
    const { pokemons, count, isLoading: pokemonsLoading, error: pokemonsError } = useAppSelector((state) => state.pokemonsListReducer)
    const { type, isLoading: singleTypeLoading, error: singleTypeError } = useAppSelector((state) => state.singleTypeReducer)
    const navigate = useNavigate()

    const [searchParams, setSearchParams] = useSearchParams([['page', '1']])

    useEffect(() => {
        if (searchParams.has('type')) {
            const typeParam = searchParams.get('type')
            if (typeParam) {
                dispatch(fetchSingleType({ name: typeParam }))
            }
        }
        if (searchParams.has('page')) {
            const pageParam = searchParams.get('page')
            if (pageParam) {
                const page = Number(pageParam) <= 1 ? 1 : Number(pageParam)
                dispatch(fetchData({ page }))
            }
        }
    }, [searchParams, dispatch])

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
                            {type.pokemon.map(({ pokemon }) => {
                                const idFromUrl = pokemon.url.split('/').at(-2)
                                return (
                                    <motion.div
                                        onClick={() => {
                                            navigate(`/pokemon/${pokemon.name}`)
                                        }}
                                        whileHover={{ scale: 1.05 }}
                                        className={styles.pokemonItem}
                                        key={pokemon.name}
                                    >
                                        <img
                                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idFromUrl}.png`}
                                            height={160}
                                            width={160}
                                        />
                                        {pokemon.name}
                                    </motion.div>
                                )
                            })}
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
                    {!pokemonsLoading &&
                        !pokemonsError &&
                        pokemons.map((pokemon) => {
                            const idFromUrl = pokemon.url.split('/').at(-2)
                            return (
                                <div
                                    onClick={() => {
                                        navigate(`/pokemon/${pokemon.name}`)
                                    }}
                                    className={styles.pokemonItem}
                                    key={pokemon.name}
                                >
                                    <img
                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idFromUrl}.png`}
                                        height={160}
                                        width={160}
                                    />
                                    <p>{pokemon.name}</p>
                                </div>
                            )
                        })}
                </div>
            </>
        ),
        [pokemons, searchParams, count, pokemonsLoading, setSearchParams, pokemonsError]
    )

    return <div className={styles.container}>{searchParams.get('type') ? renderSingleTypeList() : renderPokemonsList()}</div>
}
