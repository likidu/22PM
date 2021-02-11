import { FunctionalComponent, h } from 'preact'
import { useRef } from 'preact/hooks'

import { LazyImage } from '../components'
import { useLineClamp } from '../hooks'

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
    const textRef = useRef<HTMLParagraphElement>(null)
    useLineClamp(textRef, 3)

    return (
        <div
            data-selectable
            data-selected-uid={uid}
            class="flex justify-between p-2"
        >
            {thumbnail && <LazyImage src={thumbnail} />}
            <p ref={textRef} class="text-primary text-left w-full ml-2">
                {text}
            </p>
        </div>
    )
}
