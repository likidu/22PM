import { Fragment, FunctionalComponent, h } from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'
import { route } from 'preact-router'

import xiaoyuzhouFmApi from '../services/api'
import { Content, List, ListItem } from '../components'

import { EditorPick } from '../types/api.type'
import { useNavigation, useSoftkey } from '../hooks'

interface DailyPickProps {
    daily: EditorPick
}

const DailyPick: FunctionalComponent<DailyPickProps> = ({
    daily,
}: DailyPickProps) => {
    const { date, picks } = daily

    const [year, month, day] = date.split('-')
    return (
        <Fragment>
            <h4 class="font-semibold px-2 py-1">
                <span class="text-shakespeare-300">{`${year}.`}</span>
                <span class="text-shakespeare-600">{`${month}.${day}`}</span>
            </h4>
            {picks.map((pick, index) => (
                <ListItem
                    key={index}
                    text={pick.episode.title}
                    uid={pick.episode.eid}
                    thumbnail={pick.episode.image.thumbnailUrl}
                />
            ))}
        </Fragment>
    )
}

interface DiscoveryProps {
    onSwitch: () => void
}

const Discovery: FunctionalComponent<DiscoveryProps> = ({
    onSwitch,
}: DiscoveryProps) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const listRef = useRef<HTMLDivElement>(null)
    const [editorPicks, setEditorPicks] = useState<EditorPick[]>([])
    const [, setNavigation, getCurrent] = useNavigation(
        'Discovery',
        containerRef,
        listRef,
        'y',
    )

    const onKeyCenter = () => {
        const { uid } = getCurrent()
        if (uid) route(`/episode/${uid}`)
    }

    useSoftkey(
        'Discovery',
        {
            left: 'Player',
            right: 'Settings',
            onKeyCenter,
            onKeyLeft: () => console.log('Discovery onKeyLeft'),
            onKeyRight: () => console.log('Discovery onKeyRight'),
            onKeyArrowRight: onSwitch,
        },
        [editorPicks],
    )

    useEffect(() => {
        void (async () => {
            const result = await xiaoyuzhouFmApi.editorPick()
            setEditorPicks(result)
        })()
    }, [])

    useEffect(() => setNavigation(0), [editorPicks])

    return (
        <Content containerRef={containerRef}>
            <List containerRef={listRef}>
                {editorPicks && editorPicks.length > 0 ? (
                    editorPicks.map((daily, index) => (
                        <DailyPick key={index} daily={daily} />
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </List>
        </Content>
    )
}

export default Discovery
