import { FunctionalComponent, h } from 'preact'
import { PopupType } from '../types/popup.type'

type PopupEntityProps = PopupType

const PopupEntity = ({ component, props }: PopupEntityProps) => {
    console.log(typeof component)

    if (component) {
        return <div>{h(component, props)}</div>
    }

    return <div>Empty popup</div>
}

interface PopupProps {
    popups: PopupType[]
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
