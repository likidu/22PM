import { FunctionalComponent } from 'preact'

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
        // [key: string]: T
    }
    options: PopupOptions
}