export interface PlayerEpisode {
    eid: string
    title: string
    mediaKey: string
    duration: number
}

export interface PlayerState {
    episode: PlayerEpisode
    playing: boolean
    progress: number
}

// Allowed action type
export enum PlayerActionType {
    EPISODE = 'episode',
    PLAY = 'play',
    PROGRESS = 'progress',
    RESET = 'reset',
}

// Dispatch parameter type
export type PlayerAction =
    | { type: PlayerActionType.EPISODE; episode: PlayerEpisode }
    | { type: PlayerActionType.PLAY; playing: boolean }
    | { type: PlayerActionType.PROGRESS; progress: number }
    | { type: PlayerActionType.RESET }
