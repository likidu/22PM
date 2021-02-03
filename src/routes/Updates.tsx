import { FunctionalComponent, h } from 'preact'
import { usePopup, useSoftkey } from '../hooks'

import { Content, List, ListItem, Menu } from '../components'
import { useRef } from 'preact/hooks'
import { route } from 'preact-router'

interface UpdatesProps {
    onSwitch: () => void
}

const Updates: FunctionalComponent<UpdatesProps> = ({
    onSwitch,
}: UpdatesProps) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const menuRef = useRef<HTMLDivElement>(null)

    const [showMenu] = usePopup(Menu)

    const menus = [
        {
            text: 'Subscription',
            key: 'subscription',
            action: () => route('/subscription', true),
        },
        {
            text: 'About',
            key: 'about',
            action: () => console.log('About'),
            confirm: true,
        },
    ]

    useSoftkey('Updates', {
        left: 'Player',
        right: 'Settings',
        onKeyLeft: () => console.log('Updates onKeyLeft'),
        onKeyRight: () => showMenu({ menus, containerRef: menuRef }),
        onKeyArrowLeft: onSwitch,
    })
    return (
        <Content containerRef={containerRef}>
            <h1>My Updates</h1>
        </Content>
    )
}

export default Updates
