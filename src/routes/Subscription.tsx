import { FunctionalComponent, h } from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'
import { route } from 'preact-router'
import { useNavigation, useSoftkey } from '../hooks'

import xiaoyuzhouFmApi from '../services/api'
import { Content, List, ListItem } from '../components'

import { PodcastType } from '../types/api.type'

const Subscription: FunctionalComponent = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const listRef = useRef<HTMLDivElement>(null)
    const [podcasts, setPodcasts] = useState<PodcastType[]>([])

    const [, setNavigation, getCurrent] = useNavigation(
        'Subscription',
        containerRef,
        listRef,
        'y',
    )

    const onClose = () => route('/updates', true)

    useSoftkey(
        'Subscription',
        {
            right: 'Close',
            onKeyRight: onClose,
            onKeyBackspace: onClose,
        },
        [podcasts],
    )

    useEffect(() => {
        void (async () => {
            const result = await xiaoyuzhouFmApi.subscription()
            setPodcasts(result)
        })()
    }, [])

    useEffect(() => setNavigation(0), [podcasts])

    return (
        <Content containerRef={containerRef}>
            <List containerRef={listRef}>
                {podcasts && podcasts.length > 0 ? (
                    podcasts.map((podcast, index) => (
                        <ListItem
                            key={index}
                            text={podcast.title}
                            uid={podcast.pid}
                        />
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </List>
        </Content>
    )
}

export default Subscription
