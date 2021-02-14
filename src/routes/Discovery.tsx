import { Fragment, FunctionalComponent, h } from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'
import { route } from 'preact-router'

import xiaoyuzhouFmApi from '../services/api'
import {
    Content,
    IconEllipsisVertical,
    IconMusicalNote,
    List,
    ListItem,
} from '../components'

import { EditorPick } from '../types/api.type'
import { useNavigation, usePlayer, useSoftkey } from '../hooks'

interface DailyPickProps {
    daily: EditorPick
}

const DailyPick: FunctionalComponent<DailyPickProps> = ({
    daily,
}: DailyPickProps) => {
    const { date, picks } = daily

    // Title format: 2021.2.2
    const [year, month, day] = date.split('-')
    return (
        <Fragment>
            <h4 class="font-semibold px-2 py-1">
                <span class="text-shakespeare-300">{`${year}.`}</span>
                <span class="text-shakespeare-600">{`${month}.${day}`}</span>
            </h4>
            {picks.map((pick, index) => {
                // This is for a wierd case that there is no image property returned.
                const thumbnailUrl = pick.episode.image
                    ? pick.episode.image.thumbnailUrl
                    : 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='

                return (
                    <ListItem
                        key={index}
                        text={pick.episode.title}
                        uid={pick.episode.eid}
                        thumbnail={thumbnailUrl}
                    />
                )
            })}
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

    const [player] = usePlayer()
    const [, setNavigation, getCurrent] = useNavigation(
        'Discovery',
        containerRef,
        listRef,
        'y',
    )

    // Open selected episode
    const onKeyCenter = () => {
        const { uid } = getCurrent()
        if (uid) route(`/episode/${uid}`)
    }

    // Open playing episode
    const onKeyLeft = () => {
        const { eid } = player.episode
        if (eid && eid !== '') route(`/episode/${eid}`)
    }

    useSoftkey(
        'Discovery',
        {
            // Initial eid is '', and rotate when playing
            left:
                player.episode.eid === '' ? (
                    ''
                ) : (
                    <IconMusicalNote rotate={player.playing} />
                ),
            right: <IconEllipsisVertical />,
            onKeyCenter,
            onKeyLeft,
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
