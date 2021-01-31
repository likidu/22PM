import { FunctionalComponent, h } from 'preact'
import { route } from 'preact-router'
import { useRef, useEffect, useState } from 'preact/hooks'

import { usePlayer, useSoftkey } from '../hooks'
import xiaoyuzhouFmApi from '../services/api'
import { EpisodeType } from '../types/api.type'

import { Content, ProgressBar } from '../components'

interface EpisodeProps {
    eid: string
}

const Episode: FunctionalComponent<EpisodeProps> = ({ eid }: EpisodeProps) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [player, setPlayerEpisode, setPlayerPlaying] = usePlayer()

    const [episode, setEpisode] = useState<EpisodeType>({} as never)
    const [playing, setPlaying] = useState(player.playing)
    const [progress, setProgress] = useState(player.progress)

    const onKeyCenter = () => {
        // Update the reducer only when a new episode is about to play
        if (episode && episode.eid !== player.episode.eid) {
            const { eid, title, mediaKey, duration } = episode
            setPlayerEpisode({ eid, title, mediaKey, duration })
        }
        setPlaying(playing => !playing)
    }

    useSoftkey(
        'Episode',
        {
            center: 'Play',
            left: 'Info',
            right: 'Settings',
            onKeyCenter,
            onKeyLeft: () => console.log('Episode onKeyLeft'),
            onKeyRight: () => console.log('Episode onKeyRight'),
            onKeyBackspace: () => route('/'),
        },
        [episode],
    )

    useEffect(() => {
        setPlayerPlaying(playing)
    }, [playing])

    useEffect(() => {
        setProgress(player.progress)
    }, [player.progress, progress])

    useEffect(() => {
        // TODO: Refresh only the current date is changed, otherwise get frm localStorage
        const fetchData = async (): Promise<void> => {
            const result = await xiaoyuzhouFmApi.getEpisode(eid)
            setEpisode(result)
        }
        void fetchData()
    }, [])

    return (
        <Content containerRef={containerRef} title="Episode">
            <h2>{episode.title}</h2>
            <ProgressBar progress={progress / episode.duration} />

            <div dangerouslySetInnerHTML={{ __html: episode.shownotes }} />
        </Content>
    )
}

export default Episode
