import { FunctionalComponent, h } from 'preact'
import { getCurrentUrl } from 'preact-router'

interface TabProps {
    children: JSX.Element[]
}

export const Tab: FunctionalComponent<TabProps> = ({ children }: TabProps) => {
    return (
        <header class="text-center uppercase">
            <nav class="font-bold">{children}</nav>
            <ul class="flex justify-center mb-1">
                {children.map((el, index) => {
                    const matches =
                        getCurrentUrl() === (el.props.href as string)
                            ? 'w-3 bg-shakespeare-400'
                            : 'w-1 bg-gray-400'

                    return (
                        <li key={index} class="inline-block mx-0.5">
                            <div class={`h-1 rounded-full ${matches}`}></div>
                        </li>
                    )
                })}
            </ul>
        </header>
    )
}
