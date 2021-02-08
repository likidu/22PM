import { FunctionalComponent, RefObject, h } from 'preact'

interface ContentProps {
    containerRef: RefObject<HTMLDivElement>
    children: JSX.Element | JSX.Element[]
    // TODO: should use CSSProperties
    style?: {
        [key: string]: string | number | null | undefined
    }
}

export const Content: FunctionalComponent<ContentProps> = ({
    containerRef,
    children,
    style,
}: ContentProps) => {
    return (
        <main
            ref={containerRef}
            class="flex-auto self-stretch overflow-x-hidden overscroll-y-auto"
            style={style}
        >
            {children}
        </main>
    )
}
