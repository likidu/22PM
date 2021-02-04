import { FunctionalComponent, h } from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'
import { route } from 'preact-router'
import { useNavigation, usePopup, useSoftkey } from '../hooks'

import xiaoyuzhouFmApi from '../services/api'
import { Content, List, ListItem, Menu, MenuType } from '../components'

import { EpisodeType } from '../types/api.type'

interface UpdatesProps {
    onSwitch: () => void
}

const Updates: FunctionalComponent<UpdatesProps> = ({
    onSwitch,
}: UpdatesProps) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const listRef = useRef<HTMLDivElement>(null)
    const menuRef = useRef<HTMLDivElement>(null)
    const [episodes, setEpisodes] = useState<EpisodeType[]>([])

    const [, setNavigation, getCurrent] = useNavigation(
        'Updates',
        containerRef,
        listRef,
        'y',
    )

    const [showMenu] = usePopup<MenuType>(Menu)

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

    const onKeyCenter = () => {
        const { uid } = getCurrent()
        if (uid) route(`/episode/${uid}`)
    }

    useSoftkey(
        'Updates',
        {
            left: 'Player',
            right: 'Settings',
            onKeyCenter,
            onKeyLeft: () => console.log('Updates onKeyLeft'),
            onKeyRight: () => showMenu({ menus, containerRef: menuRef }),
            onKeyArrowLeft: onSwitch,
        },
        [episodes],
    )

    useEffect(() => {
        void (async () => {
            const result = await xiaoyuzhouFmApi.inbox()
            setEpisodes(result)
        })()
    }, [])

    useEffect(() => setNavigation(0), [episodes])

    return (
        <Content containerRef={containerRef}>
            <List containerRef={listRef}>
                {episodes && episodes.length > 0 ? (
                    episodes.map((episode, index) => (
                        <ListItem
                            key={index}
                            text={episode.title}
                            uid={episode.eid}
                        />
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </List>
        </Content>
    )
}

export default Updates