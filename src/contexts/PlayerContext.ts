import { createContext } from 'preact'
import { PlayerAction, PlayerState } from '../types/player.type'

export interface PlayerContextType {
    player: PlayerState
    dispatch: (action: PlayerAction) => void
}

export const PlayerContext = createContext<PlayerContextType>({} as never)
