import { FunctionalComponent, h } from 'preact'

interface ListItemProps {
    key?: number
    eid: string
    text: string
}

export const ListItem: FunctionalComponent<ListItemProps> = ({
    key,
    eid,
    text,
}: ListItemProps) => {
    return (
        <div
            key={key}
            data-selectable
            data-selected-key={eid}
            class="flex justify-between"
        >
            <p>{text}</p>
        </div>
    )
}
