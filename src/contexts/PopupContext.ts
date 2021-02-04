import { createContext } from 'preact'
import { StateUpdater } from 'preact/hooks'
import { PopupState } from '../types/popup.type'

interface PopupContextProps<T> {
    popupState: PopupState<T>[]
    setPopupState: StateUpdater<PopupState<T>[]>
}

export const PopupContext = createContext<PopupContextProps<any>>([] as never)
