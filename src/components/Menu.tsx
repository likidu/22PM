import { FunctionalComponent, h, RefObject } from 'preact'
import { useSoftkey } from '../hooks'

interface MenuItem {
    text: string
    key: string
    action: () => void
    confirm?: boolean
}

interface MenuProps {
    menus: MenuItem[]
    containerRef: RefObject<HTMLDivElement>
    close: () => void
}

export const Menu: FunctionalComponent<MenuProps> = ({
    menus,
    containerRef,
    close,
}: MenuProps) => {
    useSoftkey('Menu', {
        center: 'Select',
        right: 'Close',
        onKeyRight: close,
    })
    return (
        <div id="menu" ref={containerRef}>
            <h4>Options</h4>
            {menus &&
                menus.length > 0 &&
                menus.map(menu => <p key={menu.key}>{menu.text}</p>)}
        </div>
    )
}
