import { Fragment, FunctionalComponent, RefObject, h } from 'preact'

interface ContentProps {
    title: string
    containerRef: RefObject<HTMLDivElement>
    children: JSX.Element | JSX.Element[]
}

export const Content: FunctionalComponent<ContentProps> = ({
    title,
    containerRef,
    children,
}: ContentProps) => {
    return (
        <Fragment>
            <header class="text-center">
                <h1 class="font-light">{title}</h1>
            </header>
            <main
                ref={containerRef}
                class="flex-auto self-stretch overflow-x-hidden overscroll-y-auto"
            >
                {children}
            </main>
        </Fragment>
    )
}
