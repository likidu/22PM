import { FunctionalComponent, h } from 'preact'
import { useReducer } from 'preact/hooks'
import { Route, Router, RouterOnChangeArgs } from 'preact-router'
import { createHashHistory } from 'history'

import Discovery from './routes/Discovery'
import Episode from './routes/Episode'
import NotFound from './routes/NotFound'
import { Player, Softkey } from './components'

import {
    initialPlayerState,
    initialSoftkeyState,
    INIT_ACCESS_TOKEN,
    INIT_REFRESH_TOKEN,
} from './services/config'
import { PlayerContext, SoftkeyContext } from './contexts'
import { reducer } from './reducers'

localStorage.setItem('access-token', INIT_ACCESS_TOKEN)
localStorage.setItem('refresh-token', INIT_REFRESH_TOKEN)

const App: FunctionalComponent = () => {
    const initialState = {
        softkey: initialSoftkeyState,
        player: initialPlayerState,
    }

    const [{ softkey, player }, dispatch] = useReducer(reducer, initialState)

    // let currentUrl: string
    const handleRoute = (e: RouterOnChangeArgs) => {
        const { url } = e
        console.log(`Current URL: ${url}`)
    }

    return (
        <PlayerContext.Provider value={{ player, dispatch }}>
            <SoftkeyContext.Provider value={{ softkey, dispatch }}>
                <div id="app" class="h-screen flex flex-col">
                    <Router
                        history={createHashHistory()}
                        onChange={handleRoute}
                    >
                        <Route path="/" component={Discovery} />
                        <Route path="/episode/:eid" component={Episode} />
                        <NotFound default />
                    </Router>
                    <Player {...player} />
                    <Softkey {...softkey.current} />
                </div>
            </SoftkeyContext.Provider>
        </PlayerContext.Provider>
    )
}

export default App
