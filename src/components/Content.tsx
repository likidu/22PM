import { FunctionalComponent, RefObject, h } from 'preact'
import { CSSProperties } from '../types/common.type'

interface ContentProps {
    containerRef: RefObject<HTMLDivElement>
    children: JSX.Element | JSX.Element[]
    // TODO: should use standard CSSProperties
    style?: CSSProperties
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
