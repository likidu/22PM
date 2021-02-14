import { FunctionalComponent, h, RefObject } from 'preact'

interface ListProps {
    containerRef: RefObject<HTMLDivElement>
    children: boolean | JSX.Element | (boolean | JSX.Element)[]
    className?: string
}

export const List: FunctionalComponent<ListProps> = ({
    containerRef,
    children,
    className = '',
}: ListProps) => {
    return (
        <div
            ref={containerRef}
            class={`h-full overflow-x-hidden overflow-y-scroll ${className}`}
        >
            {children}
        </div>
    )
}
