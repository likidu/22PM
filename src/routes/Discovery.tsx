import { Fragment, FunctionalComponent, h } from 'preact'
import { route } from 'preact-router'
import { useEffect, useRef, useState } from 'preact/hooks'

import xiaoyuzhouFmApi from '../services/api'
import { Content, ListItem } from '../components'

import { EditorPick } from '../types/api.type'

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

const Discovery: FunctionalComponent = () => {
    const containerRef = useRef<HTMLDivElement>(null)

    const [editorPicks, setEditorPicks] = useState<EditorPick[]>([])

    const onKeyDown = (ev: KeyboardEvent) => {
        if (ev.key.toString() === 'Enter') route('/episode/1234')
    }

    useEffect(() => {
        // TODO: Refresh only the current date is changed, otherwise get frm localStorage
        const fetchData = async () => {
            const result = await xiaoyuzhouFmApi.editorPick()
            setEditorPicks(result)
        }
        void fetchData()

        document.addEventListener('keydown', onKeyDown)
        return () => document.removeEventListener('keydown', onKeyDown)
    }, [])

    useEffect(() => console.log(editorPicks), [editorPicks])

    return (
        <Content containerRef={containerRef} title="Discovery">
            <div>
                <h1>Discovery</h1>
                {editorPicks && editorPicks.length > 0 ? (
                    editorPicks.map((daily, index) => (
                        <DailyPick key={index} daily={daily} />
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </Content>
    )
}

export default Discovery
