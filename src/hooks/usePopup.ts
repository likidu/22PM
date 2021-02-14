import { FunctionalComponent } from 'preact'
import { useContext } from 'preact/hooks'
import { PopupContext } from '../contexts'
import { CSSProperties } from '../types/common.type'
import { PopupOptions, PopupState } from '../types/popup.type'

export const usePopup = <T>(
    component: FunctionalComponent<T>,
    style: CSSProperties = {},
    options: PopupOptions = <PopupOptions>{},
): [(props: T) => void] => {
    const { setPopupState } = useContext(PopupContext)

    const close = () => {
        setPopupState((oldState: PopupState<T>[]) => {
            const newState = [...oldState]
            newState.pop()
            return newState
        })
    }

    const closeAll = () => {
        setPopupState([])
    }

    const show = (props: T) => {
        setPopupState((oldState: PopupState<T>[]) => {
            let newState = [...oldState]
            const newPopup = {
                id: component.name,
                component,
                props: {
                    ...props,
                    close,
                    closeAll,
                },
                style,
                options,
            }
            if (options.stack) {
                // prevent showing duplicate component
                if (!newState.find(state => state.id === newPopup.id)) {
                    newState.push(newPopup)
                }
            } else {
                newState = [newPopup]
            }
            return newState
        })
    }
    return [show]
}
