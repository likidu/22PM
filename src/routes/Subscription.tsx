import { FunctionalComponent, h } from 'preact'
import { useSoftkey } from '../hooks'

import { Content, List, ListItem } from '../components'
import { useRef } from 'preact/hooks'

interface SubscriptionProps {
    onSwitch: () => void
}

const Subscription: FunctionalComponent<SubscriptionProps> = ({
    onSwitch,
}: SubscriptionProps) => {
    const containerRef = useRef<HTMLDivElement>(null)

    useSoftkey('Subscription', {
        left: 'Player',
        right: 'Settings',
        onKeyLeft: () => console.log('Subscription onKeyLeft'),
        onKeyRight: () => console.log('Subscription onKeyRight'),
        onKeyArrowLeft: onSwitch,
    })
    return (
        <Content containerRef={containerRef}>
            <h1>My subscription</h1>
        </Content>
    )
}

export default Subscription
