import { Fragment, FunctionalComponent, h } from 'preact'
import { InitialPopupState, PopupState } from '../types/popup.type'

type PopupEntityProps = PopupState<InitialPopupState>

const PopupEntity = ({
    component,
    props,
    style,
    options,
}: PopupEntityProps) => {
    if (component) {
        return (
            <div class="popup-entity" style={style}>
                {h(component, props)}
            </div>
        )
    }

    return <div>Empty popup</div>
}

interface PopupProps {
    popups: PopupState<InitialPopupState>[]
}

export const Popup: FunctionalComponent<PopupProps> = ({
    popups,
}: PopupProps) => {
    if (popups.length === 0) {
        return <Fragment />
    }
    let zIndex = 100
    const nextZIndex = () => {
        zIndex += 2
        return zIndex
    }
    // The shader is just before the last popup
    const shaderZIndex = 100 + popups.length * 2 - 1
    const lastIndex = popups.length - 1
    const hideOthers =
        popups[lastIndex] && popups[lastIndex].options
            ? popups[lastIndex].options.hideOthers
            : true

    return (
        <div id="popup" class="z-100">
            <div class="shader" style={{ zIndex: shaderZIndex }} />
            {popups &&
                popups.length > 0 &&
                popups.map((popup, index) => {
                    const style = {
                        zIndex: nextZIndex(),
                        visibility:
                            hideOthers && index < lastIndex
                                ? 'hidden'
                                : 'visible',
                    }
                    return (
                        <PopupEntity {...popup} key={popup.id} style={style} />
                    )
                })}
        </div>
    )
}
