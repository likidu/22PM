export type KeyHandler = (ev: KeyboardEvent | MouseEvent) => void

export interface SoftkeyConfig {
    center?: string
    left?: string
    right?: string
    onKeyCenter?: KeyHandler
    onKeyLeft?: KeyHandler
    onKeyRight?: KeyHandler
    onKeyArrowDown?: KeyHandler
    onKeyArrowUp?: KeyHandler
    onKeyArrowLeft?: KeyHandler
    onKeyArrowRight?: KeyHandler
    onKeyBackspace?: KeyHandler
}

export interface SoftkeyStateItem extends SoftkeyConfig {
    counter: number
    name: string
}

export interface SoftkeyState {
    stack: SoftkeyStateItem[]
    current: SoftkeyStateItem
}

// Allowed action type
export enum SoftkeyActionType {
    SET = 'set',
    REPLACE = 'replace',
    PUSH = 'push',
    POP = 'pop',
}

// Dispatch parameter type
export type SoftkeyAction =
    | { type: SoftkeyActionType.SET; config: SoftkeyConfig }
    | { type: SoftkeyActionType.REPLACE; config: SoftkeyConfig }
    | { type: SoftkeyActionType.PUSH; origin: string }
    | { type: SoftkeyActionType.POP; origin: string }
