import { FunctionalComponent, h } from 'preact'
import { useReducer, useState } from 'preact/hooks'
import { route, Route, Router, RouterOnChangeArgs } from 'preact-router'
import { createHashHistory } from 'history'

import Main from './routes/Main'
import Auth from './routes/Auth'
import Episode from './routes/Episode'
import Subscription from './routes/Subscription'
import NotFound from './routes/NotFound'
import { Player, Popup, Softkey } from './components'

import {
    initialPlayerState,
    initialSoftkeyState,
    INIT_ACCESS_TOKEN,
    INIT_REFRESH_TOKEN,
} from './services/config'
import { PlayerContext, PopupContext, SoftkeyContext } from './contexts'
import { reducer } from './reducers'
import { InitialPopupState, PopupState } from './types/popup.type'

// localStorage.setItem('access-token', INIT_ACCESS_TOKEN)
// localStorage.setItem('refresh-token', INIT_REFRESH_TOKEN)

const App: FunctionalComponent = () => {
    const initialState = {
        softkey: initialSoftkeyState,
        player: initialPlayerState,
    }

    const [{ softkey, player }, dispatch] = useReducer(reducer, initialState)
    const [popupState, setPopupState] = useState<
        PopupState<InitialPopupState>[]
    >([])

    const handleRouteChange = (ev: RouterOnChangeArgs) => {
        const { url } = ev
        const isAuthed = localStorage.getItem('authed')
        if (url === '/') {
            if (!isAuthed || !JSON.parse(isAuthed)) route('/auth', true)
        }
    }

    return (
        <PlayerContext.Provider value={{ player, dispatch }}>
            <SoftkeyContext.Provider value={{ softkey, dispatch }}>
                <PopupContext.Provider value={{ popupState, setPopupState }}>
                    <div
                        id="app"
                        class="font-kaios h-screen relative flex flex-col"
                    >
                        <Router
                            history={createHashHistory()}
                            onChange={handleRouteChange}
                        >
                            <Main path="/:*" />
                            <Auth path="/auth" />
                            <Route path="/episode/:eid" component={Episode} />
                            <Subscription path="/subscription" />
                            <NotFound default />
                        </Router>
                        <Player {...player} />
                        <Softkey {...softkey.current} />
                        <Popup popups={popupState} />
                    </div>
                </PopupContext.Provider>
            </SoftkeyContext.Provider>
        </PlayerContext.Provider>
    )
}

export default App
