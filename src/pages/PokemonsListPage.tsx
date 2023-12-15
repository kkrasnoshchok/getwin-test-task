import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/reducers/store'
import { fetchData, fetchSingleType, fetchTypes } from '../store/actions/data'
import { useNavigate } from 'react-router-dom'

const PokemonsListPage: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { pokemons, count, nextPageUrl, previousPageUrl, isLoading } = useAppSelector((state) => state.pokemonsListReducer)
    const { types, isLoading: typesLoading, error: typesError } = useAppSelector((state) => state.typesReducer)
    const { type, isLoading: singleTypeLoading, error: singleTypeError } = useAppSelector((state) => state.singleTypeReducer)

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 20

    useEffect(() => {
        if (!pokemons.length) {
            dispatch(fetchData({ amount: itemsPerPage }))
        }
        if (!types.length) {
            dispatch(fetchTypes())
        }
    }, [dispatch])

    // Function to handle page changes
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber)
        dispatch(fetchData({ specPage: pageNumber > currentPage ? nextPageUrl : previousPageUrl }))
    }

    const [inputValue, setInputValue] = useState('')
    const [selectValue, setSelectValue] = useState('')

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
            {types.length && (
                <select
                    onChange={(e) => {
                        setSelectValue(e.target.value)
                        if (e.target.value !== '') {
                            dispatch(fetchSingleType({ name: e.target.value }))
                        }
                    }}
                    value={selectValue}
                >
                    <option value={''} label={selectValue.length ? 'Clear Selection' : 'Please Select Value'} />
                    {types.map((type) => (
                        <option key={type.name} label={`${type.name[0].toUpperCase()}${type.name.slice(1, type.name.length)}`} value={type.name} />
                    ))}
                </select>
            )}
            {/* Pokemons By Type List */}
            {selectValue && (
                <>
                    {singleTypeError && <p>Single Type error</p>}
                    {singleTypeLoading && <p>Type is loading</p>}
                    {type && (
                        <div className="">
                            {type.name}
                            {/* pokemons list */}
                            {type.pokemon.length &&
                                type.pokemon.map(({ pokemon }) => (
                                    <div className="" key={pokemon.name}>
                                        Name {`->`} {pokemon.name}
                                    </div>
                                ))}
                        </div>
                    )}
                </>
            )}

            {/* Pokemons List and Pagination Component */}
            {!selectValue && (
                <>
                    {isLoading && <p>Pokemons are loading</p>}
                    {pokemons.length &&
                        !isLoading &&
                        pokemons.map((pokemon) => (
                            <div key={pokemon.id}>
                                <p>Name: {pokemon.name}</p>
                            </div>
                        ))}

                    {/* Pagination component */}
                    <div>
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                            Previous
                        </button>
                        <span> Page {currentPage} </span>
                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage * itemsPerPage >= count}>
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}

export default PokemonsListPage
