import { FunctionalComponent, h } from 'preact'

import { ProgressBar } from './ProgressBar'

interface CoverProps {
    episodeTitle: string
    podcastTitle: string
    coverImage: string
    textColor: string
    progress: number
}

export const Cover: FunctionalComponent<CoverProps> = ({
    episodeTitle,
    podcastTitle,
    coverImage,
    textColor,
    progress,
}: CoverProps) => {
    console.log()

    return (
        <div class="text-center p-3">
            <img
                src={coverImage}
                class="objec-fill w-36 max-w-xs rounded-lg shadow-xl mx-auto"
            />
            <h4 class="text-white px-3 mt-4 mb-1">{episodeTitle}</h4>
            <span style={{ color: textColor }}>{podcastTitle}</span>
            <ProgressBar progress={progress} />
        </div>
    )
}