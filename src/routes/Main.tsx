import { Fragment, FunctionalComponent, h } from 'preact'
import { route, Router } from 'preact-router'
import { Link } from 'preact-router/match'

import Discovery from './Discovery'
import Updates from './Updates'
import { Tab } from '../components'

const Main: FunctionalComponent = () => {
    return (
        <Fragment>
            <Tab>
                <Link activeClassName="tab-active" class="tab" href="/">
                    Discovery
                </Link>
                <Link activeClassName="tab-active" class="tab" href="/updates">
                    Updates
                </Link>
            </Tab>
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
