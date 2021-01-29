import { initialPlayerState, initialSoftkeyState } from '../services/config'
import {
    PlayerAction,
    PlayerActionType,
    PlayerState,
} from '../types/player.type'
import {
    SoftkeyAction,
    SoftkeyActionType,
    SoftkeyState,
    SoftkeyStateItem,
} from '../types/softkey.type'

/**
 *
 * @param state {
 *                  sofkey: { stack, current },
 *                  player: { episode, playing, progress }
 *              }
 * @param action {
 *                  type,
 *                  softkey: { origin / config},
 *                  player: { episode, playing, progress, reset }
 *               }
 */

type State = {
    softkey: SoftkeyState
    player: PlayerState
}

// Discriminated union type
type Action = SoftkeyAction | PlayerAction

export const reducer = (state: State, action: Action): State => {
    const { softkey, player } = state
    // console.log('Reducer, current state is:', state)

    let stack, current: SoftkeyStateItem
    switch (action.type) {
        /**
         * Softkey
         */
        case SoftkeyActionType.SET:
            // Remain Softkey 'name' and 'counter' unchanged.
            // Add 'config' from the page uses Softkey
            return {
                ...state,
                softkey: {
                    ...softkey,
                    current: { ...softkey.current, ...action.config },
                },
            }
        case SoftkeyActionType.REPLACE:
            // Replace the Softkey 'name' and 'counter
            // Add 'config' from the page uses Softkey

            // eslint-disable-next-line no-case-declarations
            const { name, counter } = softkey.current
            return {
                ...state,
                softkey: {
                    ...softkey,
                    current: { name, counter, ...action.config },
                },
            }
        case SoftkeyActionType.PUSH:
            stack = softkey.stack || []
            current = softkey.current
            if (!current) {
                current = { name: action.origin, counter: 1 }
            } else if (current.name !== action.origin) {
                stack.push(current)
                current = { name: action.origin, counter: 1 }
            } else {
                current.counter++
            }
            return { ...state, softkey: { stack, current } }
        case SoftkeyActionType.POP:
            stack = softkey.stack || []
            current = softkey.current
            if (current.name !== action.origin) {
                // The component order called of unmount doesn't follow the stack order
                // therefore searching for the right stack to minus the counter
                // and remove it from the stack
                let searchIndex = stack.length
                while (searchIndex--) {
                    const searchStack = stack[searchIndex]
                    if (searchStack.name === action.origin) {
                        searchStack.counter--
                        if (searchStack.counter === 0) {
                            stack.splice(searchIndex, 1)
                        }
                        break
                    }
                }
            } else {
                current.counter--
                if (current.counter === 0) {
                    const item = stack.pop()
                    current = item ? item : initialSoftkeyState.current
                }
            }
            return { ...state, softkey: { stack, current } }

        /**
         * Player
         */
        case PlayerActionType.EPISODE:
            return { ...state, player: { ...player, episode: action.episode } }
        case PlayerActionType.PLAY:
            return { ...state, player: { ...player, playing: action.playing } }
        case PlayerActionType.PROGRESS:
            return {
                ...state,
                player: { ...player, progress: action.progress },
            }
        case PlayerActionType.RESET:
            return { ...state, player: initialPlayerState }
        default:
            return state
    }
}
