import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../resources/routes-constants'

export const NotFoundPage = (): JSX.Element => {
    const navigate = useNavigate()

    const redirectToHomePage = () => {
        navigate(ROUTES.POKEMONS_LIST)
    }

    return (
        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h1 style={{ fontSize: '4em' }}>Йой 404!</h1>
            <span style={{ cursor: 'pointer' }} onClick={() => redirectToHomePage()}>
                Повернутись на головну сторінку
            </span>
        </div>
    )
}
