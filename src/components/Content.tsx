import { FunctionalComponent, RefObject, h } from 'preact'

interface ContentProps {
    containerRef: RefObject<HTMLDivElement>
    children: JSX.Element | JSX.Element[]
}

export const Content: FunctionalComponent<ContentProps> = ({
    containerRef,
    children,
}: ContentProps) => {
    return (
        <main
            ref={containerRef}
            class="flex-auto self-stretch overflow-x-hidden overscroll-y-auto"
        >
            {children}
        </main>
    )
}
