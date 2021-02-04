import { FunctionalComponent, h } from 'preact'

interface ListItemProps {
    uid: string
    text: string
}

export const ListItem: FunctionalComponent<ListItemProps> = ({
    uid,
    text,
}: ListItemProps) => {
    return (
        <div
            data-selectable
            data-selected-uid={uid}
            class="flex justify-between"
        >
            <p>{text}</p>
        </div>
    )
}
