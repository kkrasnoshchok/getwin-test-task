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
            <button onClick={() => navigate(-1)}>go home</button>
            <h1 style={{ fontSize: '4em' }}>Pokemon: {params.pokemonSlug}</h1>
            {isLoading && <h1>Loading....</h1>}
            {error && <h1>There is no pokemon with such name. Please try another one</h1>}
            {!isLoading && !error && pokemon && (
                <div className="">
                    <div>{pokemon.name}</div>
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} height={200} width={200} />
                    <div className="">Types: </div>
                    {pokemon.types &&
                        pokemon.types.map(({ type }) => (
                            <div className="" style={{ cursor: 'pointer' }} onClick={() => navigate(`/?type=${type.name}`)} key={type.name}>
                                {type.name}
                            </div>
                        ))}
                    <div className="">Moves:</div>
                    <ul>{pokemon.moves && pokemon.moves.length && pokemon.moves.map((move) => <li key={move.move.name}>{move.move.name}</li>)}</ul>
                </div>
            )}
        </div>
    )
}

export default PokemonDetailsPage
