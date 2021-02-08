import { FunctionalComponent, h } from 'preact'

interface ProgressBarProps {
    progress: number
}

export const ProgressBar: FunctionalComponent<ProgressBarProps> = ({
    progress,
}: ProgressBarProps) => {
    return (
        <div class="h-3 relative max-w-xl rounded-full overflow-hidden mx-auto">
            <div class="w-full h-full bg-gray-200 absolute"></div>
            <div
                class="h-full bg-shakespeare-500 absolute"
                style={{ width: `${progress * 100}%` }}
            ></div>
        </div>
    )
}
