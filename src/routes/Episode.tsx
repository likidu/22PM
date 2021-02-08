import { Fragment, FunctionalComponent, h } from 'preact'
import { useRef, useEffect, useState } from 'preact/hooks'

import { usePlayer, useSoftkey } from '../hooks'
import xiaoyuzhouFmApi from '../services/api'
import { EpisodeType } from '../types/api.type'

import {
    Content,
    Cover,
    IconChatbbble,
    IconInformation,
    IconPause,
    IconPlay,
} from '../components'
import { Details } from '../components/Details'

import Palette from 'react-palette'

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
    const [detailedView, setDetailedView] = useState(false)

    const placeholder =
        'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

    const renderContent = (color: string | undefined) => {
        if (detailedView)
            return (
                <Details
                    episodeTitle={episode.title}
                    podcastTitle={episode.podcast.title}
                    podcastLogo={episode.podcast.image.thumbnailUrl}
                    textColor={color ? color : '#444'}
                    shownotes={episode.shownotes}
                />
            )
        else
            return (
                <Cover
                    episodeTitle={episode.title}
                    podcastTitle={episode.podcast.title}
                    coverImage={
                        episode.image ? episode.image.smallPicUrl : placeholder
                    }
                    textColor={color ? color : '#444'}
                    progress={progress / episode.duration}
                />
            )
    }

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
        setProgress(progress => progress - 15)
    }

    const onKeyArrowRight = () => {
        setSkip(true)
        setProgress(progress => progress + 30)
    }

    useSoftkey(
        'Episode',
        {
            center: playing ? <IconPause /> : <IconPlay />,
            left: <IconInformation />,
            right: <IconChatbbble />,
            onKeyCenter,
            onKeyLeft: () => setDetailedView(detailedView => !detailedView),
            onKeyRight: () => console.log('Episode onKeyRight'),
            onKeyBackspace: () => history.back(),
            onKeyArrowUp: () => volume.requestUp(),
            onKeyArrowDown: () => volume.requestDown(),
            onKeyArrowLeft,
            onKeyArrowRight,
        },
        [episode, player],
    )

    // Set playing state
    useEffect(() => {
        setPlayerPlaying(playing)
    }, [playing])

    // Skip forward and back
    useEffect(() => {
        if (skip) {
            setPlayerProgress(progress)
            setSkip(false)
        }
    }, [progress])

    // Get player progress to be used for ProgressBar
    useEffect(() => {
        if (player.episode.eid === episode.eid) setProgress(player.progress)
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
            {/* Get vibrant color from the episode cover */}
            {episode.image && (
                <Palette src={episode.image.smallPicUrl}>
                    {({ data }) => (
                        <Content
                            containerRef={containerRef}
                            style={{
                                'background-color': detailedView
                                    ? 'white'
                                    : data.lightMuted,
                            }}
                        >
                            {episode &&
                                episode.podcast &&
                                renderContent(data.darkVibrant)}
                        </Content>
                    )}
                </Palette>
            )}
        </Fragment>
    )
}

export default Episode
