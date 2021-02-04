import { Fragment, FunctionalComponent, h } from 'preact'
import { useRef, useEffect, useState } from 'preact/hooks'

import { usePlayer, useSoftkey } from '../hooks'
import xiaoyuzhouFmApi from '../services/api'
import { EpisodeType } from '../types/api.type'

import { Content, ProgressBar } from '../components'

interface EpisodeProps {
    eid: string
}

const Episode: FunctionalComponent<EpisodeProps> = ({ eid }: EpisodeProps) => {
    const volume = navigator.volumeManager

    const containerRef = useRef<HTMLDivElement>(null)
    const [
        player,
        setPlayerEpisode,
        setPlayerPlaying,
        setPlayerProgress,
    ] = usePlayer()

    const [episode, setEpisode] = useState<EpisodeType>({} as never)
    const [playing, setPlaying] = useState(player.playing)
    const [progress, setProgress] = useState(player.progress)
    const [skip, setSkip] = useState(false)

    const onKeyCenter = () => {
        // Update the reducer only when a new episode is about to play
        if (episode && episode.eid !== player.episode.eid) {
            const { eid, title, mediaKey, duration } = episode
            setPlayerEpisode({ eid, title, mediaKey, duration })
        }

        setPlaying(playing => !playing)
    }

    const onKeyArrowLeft = () => {
        setSkip(true)
        setProgress(progress => progress - 20)
    }

    const onKeyArrowRight = () => {
        setSkip(true)
        setProgress(progress => progress + 20)
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
            onKeyBackspace: () => history.back(),
            onKeyArrowUp: () => volume.requestUp(),
            onKeyArrowDown: () => volume.requestDown(),
            onKeyArrowLeft,
            onKeyArrowRight,
        },
        [episode],
    )

    useEffect(() => {
        setPlayerPlaying(playing)
    }, [playing])

    useEffect(() => {
        if (skip) {
            setPlayerProgress(progress)
            setSkip(false)
        }
    }, [progress])

    // Get player progress to be used for ProgressBar
    useEffect(() => {
        setProgress(player.progress)
    }, [player.progress])

    useEffect(() => {
        void (async (): Promise<void> => {
            const result = await xiaoyuzhouFmApi.getEpisode(eid)
            setEpisode(result)
        })()
    }, [])

    useEffect(() => {
        console.log(episode)
    }, [episode])

    return (
        <Fragment>
            <header class="text-center">
                <h1 class="font-light">Episode</h1>
            </header>
            <Content containerRef={containerRef}>
                <h2>{episode.title}</h2>
                <ProgressBar progress={progress / episode.duration} />

                <div dangerouslySetInnerHTML={{ __html: episode.shownotes }} />
            </Content>
        </Fragment>
    )
}

export default Episode
