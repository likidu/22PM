import { createContext } from 'preact'
import { PlayerAction, PlayerState } from '../types/player.type'

interface PlayerContextProps {
    player: PlayerState
    dispatch: (action: PlayerAction) => void
}

export const PlayerContext = createContext<PlayerContextProps>({} as never)
