import { createAction } from '@reduxjs/toolkit'
import { PokeAPI } from 'pokeapi-types'

// Pokemons List
export const fetchPokemonsRequestAction = createAction('pokemons/request')
export const fetchPokemonsSuccessAction = createAction<PokeAPI.NamedAPIResourceList>('pokemons/success')
export const fetchPokemonsFailureAction = createAction<string>('pokemons/error')

// Single Pokemon By Name
export const fetchPokemonByNameRequestAction = createAction('singlePokemon/request')
export const fetchPokemonByNameSuccessAction = createAction<PokeAPI.Pokemon>('singlePokemon/success')
export const fetchPokemonByNameFailureAction = createAction<string>('singlePokemon/error')

// Types List
export const fetchTypesRequestAction = createAction('types/request')
export const fetchTypesSuccessAction = createAction<PokeAPI.NamedAPIResourceList>('types/success')
export const fetchTypesFailureAction = createAction<string>('types/error')

// Single Type
export const fetchSingleTypeRequestAction = createAction('singleType/request')
export const fetchSingleTypeSuccessAction = createAction<PokeAPI.Type>('singleType/success')
export const fetchSingleTypeFailureAction = createAction<string>('singleType/error')
