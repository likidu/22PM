import { FunctionalComponent, h, RefObject } from 'preact'
import { useNavigation, useSoftkey } from '../hooks'

import { List, ListItem } from '../components'
import { useEffect, useRef } from 'preact/hooks'

export interface MenuType {
    menus: MenuItem[]
    containerRef: RefObject<HTMLDivElement>
}

interface MenuItem {
    text: string
    key: string
    action: () => void
    confirm?: boolean
}

interface MenuProps extends MenuType {
    close?: () => void
}

export const Menu: FunctionalComponent<MenuProps> = ({
    menus,
    containerRef,
    close,
}: MenuProps) => {
    const listRef = useRef<HTMLDivElement>(null)

    const [, setNavigation, getCurrent] = useNavigation(
        'Menu',
        containerRef,
        listRef,
        'y',
    )

    const onKeyCenter = () => {
        const { index } = getCurrent()
        const menu = menus[index]

        if (menu.action) {
            menu.action()
            if (!menu.confirm && close) close()
        }
    }

    useSoftkey('Menu', {
        center: 'Select',
        right: 'Close',
        onKeyCenter,
        onKeyRight: close,
    })

    useEffect(() => setNavigation(0), [])

    return (
        <div id="menu" ref={containerRef}>
            <h4 class="px-3 py-1 font-bold text-white">Options</h4>
            <List containerRef={listRef}>
                {menus && menus.length > 0 ? (
                    menus.map((menu, index) => (
                        <ListItem key={index} text={menu.text} uid={menu.key} />
                    ))
                ) : (
                    <p>No menu items.</p>
                )}
            </List>
        </div>
    )
}
