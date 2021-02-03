import { FunctionalComponent } from 'preact'

export interface PopupType {
    id: string
    component: FunctionalComponent
    props: any
    options: Record<string, unknown>
}
