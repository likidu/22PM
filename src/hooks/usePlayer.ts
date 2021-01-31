import { useContext, useEffect, useState } from 'preact/hooks'
import { PlayerContext } from '../contexts'

import {
    PlayerActionType,
    PlayerEpisode,
    PlayerState,
} from '../types/player.type'

export const usePlayer = (): [
    PlayerState,
    (episode: PlayerEpisode) => void,
    (playing: boolean) => void,
    (progress: number) => void,
] => {
    const context = useContext(PlayerContext)
    if (context === undefined) {
        throw new Error(
            'usePlayer must be used within a PlayerContext.Provider',
        )
    }

    const { player, dispatch } = context

    const setPlayerEpisode = (episode: PlayerEpisode) => {
        dispatch({ type: PlayerActionType.EPISODE, episode })
    }

    const setPlayerPlaying = (playing: boolean) => {
        dispatch({ type: PlayerActionType.PLAY, playing })
    }

    const setPlayerProgress = (progress: number) => {
        dispatch({ type: PlayerActionType.PROGRESS, progress })
    }

    return [player, setPlayerEpisode, setPlayerPlaying, setPlayerProgress]
}
