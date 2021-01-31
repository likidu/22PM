import { FunctionalComponent, h } from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'

import { usePlayer } from '../hooks'
import { PlayerState } from '../types/player.type'

type PlayerProps = PlayerState

export const Player: FunctionalComponent<PlayerProps> = ({
    episode: contextEpisode,
    playing,
    progress: contextProgress,
}: PlayerProps) => {
    const audioRef = useRef<HTMLAudioElement>()
    const { current: audioEl } = audioRef

    const [, , , setPlayerProgress] = usePlayer()

    const [episode, setEpisode] = useState(contextEpisode)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        setEpisode(contextEpisode)
    }, [contextEpisode])

    useEffect(() => {
        if (audioEl) {
            audioEl.onerror = (ev: Event | string) =>
                console.error('Audio error', ev)
            audioEl.ontimeupdate = () => {
                const currentTime = audioEl.currentTime
                if (currentTime !== contextProgress) setProgress(currentTime)
            }
        }
    }, [episode])

    useEffect(() => {
        if (audioEl) {
            playing ? void audioEl.play() : void audioEl.pause()
        }
    }, [playing])

    useEffect(() => {
        setPlayerProgress(progress)
    }, [progress])

    return (
        <div>
            <h2 class="bg-green-50">{episode.title}</h2>
            <audio ref={audioRef} controls={false} src={episode.mediaKey} />
        </div>
    )
}
