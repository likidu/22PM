import { Fragment, FunctionalComponent, h } from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'
import { route } from 'preact-router'

import xiaoyuzhouFmApi from '../services/api'
import { Content, List, ListItem } from '../components'

import { EditorPick } from '../types/api.type'
import { useNavigation, useSoftkey } from '../hooks'

interface DailyPickProps {
    key: number
    daily: EditorPick
}

const DailyPick: FunctionalComponent<DailyPickProps> = ({
    key,
    daily,
}: DailyPickProps) => {
    const { date, picks } = daily
    return (
        <Fragment>
            <h4 key={key}>{date}</h4>
            {picks.map((pick, index) => (
                <ListItem
                    key={index}
                    text={pick.episode.title}
                    eid={pick.episode.eid}
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
        const { key } = getCurrent()
        if (key) route(`/episode/${key}`)
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

    useEffect(() => setNavigation(0), [editorPicks])

    useEffect(() => {
        // TODO: refresh only the current date is changed, otherwise get frm localStorage
        const fetchData = async () => {
            const result = await xiaoyuzhouFmApi.editorPick()
            setEditorPicks(result)
        }
        void fetchData()
    }, [])

    useEffect(() => {
        console.log(editorPicks)
    }, [editorPicks])
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
