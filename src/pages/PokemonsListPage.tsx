import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/reducers/store'
import { fetchData, fetchSingleType, fetchTypes } from '../store/actions/data'
import { useNavigate, useSearchParams } from 'react-router-dom'

const PokemonsListPage: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { pokemons, count, isLoading } = useAppSelector((state) => state.pokemonsListReducer)
    const { types, isLoading: typesLoading, error: typesError } = useAppSelector((state) => state.typesReducer)
    const { type, isLoading: singleTypeLoading, error: singleTypeError } = useAppSelector((state) => state.singleTypeReducer)
    const itemsPerPage = 20

    useEffect(() => {
        if (!types.length) {
            dispatch(fetchTypes())
        }
    }, [dispatch])

    // Function to handle page changes

    const [inputValue, setInputValue] = useState('')
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
                if (Number(pageParam) <= 1) {
                    dispatch(fetchData({}))
                    return
                }
                dispatch(fetchData({ page: Number(pageParam) }))
            }
        }
    }, [searchParams])

    return (
        <div>
            <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="search pokemon by name" />
            <button
                disabled={!inputValue.length}
                onClick={() => {
                    navigate(`/pokemon/${inputValue.trim().toLowerCase()}`)
                }}
            >
                Search Pokemon
            </button>
            <div className="">Types</div>
            {typesLoading && <h1>Types are loading</h1>}
            {typesError && <h1>Types Error: {typesError}</h1>}
            {type && types.length && (
                <select
                    onChange={(e) => {
                        setSearchParams(e.target.value === '' ? [['page', '1']] : [['type', e.target.value]])
                    }}
                    value={searchParams.get('type') ?? ''}
                >
                    <option value={''} label={searchParams.get('type') ? 'Clear Selection' : 'Please Select Value'} />
                    {types.map((type) => (
                        <option key={type.name} label={`${type.name[0].toUpperCase()}${type.name.slice(1, type.name.length)}`} value={type.name} />
                    ))}
                </select>
            )}
            {/* Pokemons By Type List */}
            {searchParams && searchParams.get('type')?.length && (
                <>
                    {singleTypeError && <p>Single Type error</p>}
                    {singleTypeLoading && <p>Type is loading</p>}
                    {type && !singleTypeLoading && type.pokemon && (
                        <div className="">
                            {type.pokemon.length ? (
                                type.pokemon.map(({ pokemon }) => (
                                    <div className="" key={pokemon.name}>
                                        Name {`->`} {pokemon.name}
                                    </div>
                                ))
                            ) : (
                                <div className="">There is no pokemon of such type</div>
                            )}
                        </div>
                    )}
                </>
            )}

            {/* Pokemons List and Pagination Component */}
            {searchParams && searchParams.get('page') && !searchParams.has('type') && (
                <>
                    {isLoading && <p>Pokemons are loading</p>}
                    {pokemons &&
                        pokemons.length &&
                        !isLoading &&
                        pokemons.map((pokemon) => (
                            <div key={pokemon.id}>
                                <p>Name: {pokemon.name}</p>
                            </div>
                        ))}

                    {/* Pagination component */}
                    <div>
                        <button
                            onClick={() => setSearchParams([['page', String(Number(searchParams.get('page')) - 1)]])}
                            disabled={!!searchParams.get('page') && Number(searchParams.get('page')) <= 1}
                        >
                            Previous
                        </button>
                        <span> Page {Number(searchParams.get('page')) <= 1 ? 1 : searchParams.get('page')} </span>
                        <button
                            onClick={() => {
                                const updatedPage = Number(searchParams.get('page')) < 1 ? 1 : Number(searchParams.get('page')) + 1
                                setSearchParams([['page', String(updatedPage)]])
                            }}
                            disabled={!!searchParams.get('page') && Number(searchParams.get('page')) * itemsPerPage >= count}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}

export default PokemonsListPage
