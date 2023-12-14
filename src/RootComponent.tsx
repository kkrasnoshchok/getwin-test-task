import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PokemonsListPage from './pages/PokemonsListPage'
import PokemonDetailsPage from './pages/PokemonDetailsPage'
import NotFoundPage from './pages/NotFoundPage'
import { ROUTES } from './resources/routes-constants'
import './styles/main.scss'

const RootComponent: React.FC = () => (
    <Router>
        <Routes>
            <Route path="*" element={<NotFoundPage />} />
            <Route path={ROUTES.POKEMONS_LIST} element={<PokemonsListPage />} />
            <Route path={ROUTES.POKEMON_DETAILS} element={<PokemonDetailsPage />} />
        </Routes>
    </Router>
)

export default RootComponent
