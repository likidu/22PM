import { FunctionalComponent, h } from 'preact'

export const Background: FunctionalComponent = () => {
    return (
        <div class="fixed left-0 top-0 h-screen w-screen -z-1">
            <div class="absolute left-0 top-0 h-full w-full bg-gradient-b-gray-cover">
                <div class="absolute left-0 top-0 h-full w-full bg-gradient-r-gray-strip-5px blend-overlay"></div>
            </div>
        </div>
    )
}
