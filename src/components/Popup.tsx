import { FunctionalComponent, h } from 'preact'
import { InitialPopupState, PopupState } from '../types/popup.type'

type PopupEntityProps = PopupState<InitialPopupState>

const PopupEntity = ({ component, props }: PopupEntityProps) => {
    console.log(typeof component)

    if (component) {
        return <div>{h(component, props)}</div>
    }

    return <div>Empty popup</div>
}

interface PopupProps {
    popups: PopupState<InitialPopupState>[]
}

export const Popup: FunctionalComponent<PopupProps> = ({
    popups,
}: PopupProps) => {
    console.log(popups)

    return (
        <div id="popup">
            {popups &&
                popups.length > 0 &&
                popups.map(popup => <PopupEntity {...popup} key={popup.id} />)}
        </div>
    )
}
