import { FunctionalComponent } from 'preact'
import { AnyObject, CSSProperties } from './common.type'

export type InitialPopupState = AnyObject

export interface PopupOptions extends AnyObject {
    stack: boolean
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
