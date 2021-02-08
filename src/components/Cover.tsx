import { FunctionalComponent, h } from 'preact'

import { ProgressBar } from './ProgressBar'

interface CoverProps {
    episodeTitle: string
    podcastTitle: string
    coverImage: string
    progress: number
}

export const Cover: FunctionalComponent<CoverProps> = ({
    episodeTitle,
    podcastTitle,
    coverImage,
    progress,
}: CoverProps) => {
    console.log()

    return (
        <div class="text-center p-3">
            {coverImage && (
                <img
                    src={coverImage}
                    class="objec-fill w-36 max-w-xs shadow-xl mx-auto"
                />
            )}
            <h4 class="my-2">{episodeTitle}</h4>
            <span class="text-gray-400">{podcastTitle}</span>
            <ProgressBar progress={progress} />
        </div>
    )
}
