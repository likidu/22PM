import { FunctionalComponent, h } from 'preact'
import { useReducer, useState } from 'preact/hooks'
import { Route, Router } from 'preact-router'
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

localStorage.setItem('access-token', INIT_ACCESS_TOKEN)
localStorage.setItem('refresh-token', INIT_REFRESH_TOKEN)

const App: FunctionalComponent = () => {
    const initialState = {
        softkey: initialSoftkeyState,
        player: initialPlayerState,
    }

    const [{ softkey, player }, dispatch] = useReducer(reducer, initialState)
    const [popupState, setPopupState] = useState<
        PopupState<InitialPopupState>[]
    >([])

    return (
        <PlayerContext.Provider value={{ player, dispatch }}>
            <SoftkeyContext.Provider value={{ softkey, dispatch }}>
                <PopupContext.Provider value={{ popupState, setPopupState }}>
                    <div
                        id="app"
                        class="font-kaios h-screen relative flex flex-col"
                    >
                        <Router history={createHashHistory()}>
                            <Route path="/:*" component={Main} />
                            <Route path="/auth" component={Auth} />
                            <Route path="/episode/:eid" component={Episode} />
                            <Route
                                path="/subscription"
                                component={Subscription}
                            />
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
