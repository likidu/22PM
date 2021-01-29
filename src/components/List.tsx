import { FunctionalComponent, h, RefObject } from 'preact'

interface ListProps {
    containerRef: RefObject<HTMLDivElement>
    children: JSX.Element | JSX.Element[]
}

export const List: FunctionalComponent<ListProps> = ({
    containerRef,
    children,
}: ListProps) => {
    return (
        <div
            ref={containerRef}
            class="w-full h-full overflow-x-hidden overflow-y-scroll"
        >
            {children}
        </div>
    )
}
