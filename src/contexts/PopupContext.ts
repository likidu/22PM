import { createContext } from 'preact'
import { StateUpdater } from 'preact/hooks'

export interface PopupContextType {
    popupState: any[]
    setPopupState: StateUpdater<any[]>
}

export const PopupContext = createContext<PopupContextType>({} as never)
