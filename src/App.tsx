import React from 'react'
import { Provider } from 'react-redux'
import RootComponent from './RootComponent'
import { store } from './store/reducers/store'

const App: React.FC = () => (
    <Provider store={store}>
            <RootComponent />
    </Provider>
)

export default App
