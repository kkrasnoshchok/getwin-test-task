import React from 'react'
import { PokeAPI } from 'pokeapi-types'
import { useNavigate } from 'react-router-dom'
import styles from './PokemonCard.module.scss'
import { API_BASE_IMAGE_URL } from '../../resources/api-constants'

type Props = {
    pokemon: PokeAPI.NamedAPIResource
}

export const PokemonCard = (props: Props) => {
    const { pokemon } = props
    const navigate = useNavigate()
    const idFromUrl = pokemon.url.split('/').at(-2)

    return (
        <div onClick={() => navigate(`/pokemon/${pokemon.name}`)} className={styles.item}>
            <img src={`${API_BASE_IMAGE_URL}/${idFromUrl}.png`} height={160} width={160} />
            <p>{pokemon.name}</p>
        </div>
    )
}
