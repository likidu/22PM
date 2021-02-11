import { FunctionalComponent, h } from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'

import { usePlayer } from '../hooks'
import { PlayerEpisode, PlayerState } from '../types/player.type'

type PlayerProps = PlayerState

export const Player: FunctionalComponent<PlayerProps> = ({
    episode: contextEpisode,
    playing: contextPlaying,
    progress: contextProgress,
}: PlayerProps) => {
    const audioRef = useRef<HTMLAudioElement>(null)
    const { current: audioEl } = audioRef

    const [, , , setPlayerProgress] = usePlayer()

    const [episode, setEpisode] = useState(contextEpisode)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        setEpisode(contextEpisode)
    }, [contextEpisode])

    useEffect(() => {
        if (audioEl) {
            contextPlaying ? void audioEl.play() : audioEl.pause()
        }
    }, [contextPlaying])

    useEffect(() => {
        const timeDiff = Math.abs(progress - contextProgress)
        if (timeDiff > 2 && audioEl) audioEl.currentTime = contextProgress
    }, [contextProgress])

    useEffect(() => {
        if (audioEl) {
            audioEl.mozAudioChannelType = 'content'

            audioEl.onerror = (ev: Event | string) =>
                console.error('Audio error', ev)

            audioEl.onended = () => {
                setEpisode({} as PlayerEpisode)
            }

            audioEl.onseeking = () => audioEl.pause()

            audioEl.onseeked = () => void audioEl.play()

            audioEl.ontimeupdate = () => {
                const currentTime = audioEl.currentTime
                if (currentTime !== contextProgress) setProgress(currentTime)
            }
        }
    }, [episode])

    // Dispatch progress to reducer
    useEffect(() => {
        setPlayerProgress(progress)
    }, [progress])

    return (
        <div id="player">
            <audio
                ref={audioRef}
                type="audio/mpeg"
                controls={false}
                src={episode.mediaKey}
            />
        </div>
    )
}
