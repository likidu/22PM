import { FunctionalComponent, h } from 'preact'
import { LazyImage } from '../components'

interface ListItemProps {
    uid: string
    text: string
    thumbnail?: string
}

export const ListItem: FunctionalComponent<ListItemProps> = ({
    uid,
    text,
    thumbnail,
}: ListItemProps) => {
    return (
        <div
            data-selectable
            data-selected-uid={uid}
            class="flex justify-between p-2"
        >
            {thumbnail && <LazyImage src={thumbnail} />}
            <p class="text-left w-full ml-2 truncate-3-lines">{text}</p>
        </div>
    )
}
