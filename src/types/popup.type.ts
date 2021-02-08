import { FunctionalComponent } from 'preact'
import { CSSProperties } from './common.type'

export type InitialPopupState = {
    [key: string]: unknown
}

export interface PopupOptions {
    stack: boolean
    [key: string]: unknown
}

export interface PopupState<T> {
    id: string
    component: FunctionalComponent<T>
    props: T & {
        close: () => void
        closeAll: () => void
    }
    // TODO: should use standard CSSProperties
    style: CSSProperties
    options: PopupOptions
}
