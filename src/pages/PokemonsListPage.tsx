import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/reducers/store'
import { fetchData } from '../store/actions/data'

const PokemonsListPage: React.FC = () => {
    const dispatch = useAppDispatch()
    const { pokemons, count, nextPageUrl, previousPageUrl, isLoading } = useAppSelector((state) => state.pokemonsListReducer)

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 20

    useEffect(() => {
        if (!pokemons.length) {
            dispatch(fetchData({ amount: itemsPerPage }))
        }
    }, [])

    // Function to handle page changes
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber)
        dispatch(fetchData({ specPage: pageNumber > currentPage ? nextPageUrl : previousPageUrl }))
    }

    return (
        <div>
            <h1 style={{ fontSize: '4em' }}>Hello world!</h1>
            {isLoading && <p>Pokemons are loading</p>}
            {!isLoading &&
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
        </div>
    )
}

export default PokemonsListPage
