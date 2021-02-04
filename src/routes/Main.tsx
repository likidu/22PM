import { Fragment, FunctionalComponent, h } from 'preact'
import { route, Router } from 'preact-router'
import { Link } from 'preact-router/match'

import Discovery from './Discovery'
import Updates from './Updates'

const Main: FunctionalComponent = () => {
    return (
        <Fragment>
            <header class="text-center">
                <nav>
                    <Link activeClassName="active-tab" href="/">
                        Discovery
                    </Link>
                    <Link activeClassName="active-tab" href="/updates">
                        Updates
                    </Link>
                </nav>
            </header>
            <Router>
                <Discovery
                    path="/"
                    onSwitch={() => route('/updates', true)}
                    default
                />
                <Updates path="/updates" onSwitch={() => route('/', true)} />
            </Router>
        </Fragment>
    )
}

export default Main