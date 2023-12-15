import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/reducers/store'
import { fetchPokemonByName } from '../store/actions/data'

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
        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <button onClick={() => navigate('/')}>go home</button>
            <h1 style={{ fontSize: '4em' }}>Pokemon: {params.pokemonSlug}</h1>
            {isLoading && <h1>Loading....</h1>}
            {error && <h1>Error...</h1>}
            {!isLoading && !error && pokemon && (
                <div className="">
                    <div>{pokemon.name}</div>
                    {/* <pre>{JSON.stringify(pokemon.moves, null, 2)}</pre> */}
                    <ul>{pokemon.moves && pokemon.moves.length && pokemon.moves.map((move) => <li key={move.move.name}>{move.move.name}</li>)}</ul>
                </div>
            )}
        </div>
    )
}

export default PokemonDetailsPage
