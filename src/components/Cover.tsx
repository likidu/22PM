import { FunctionalComponent, h } from 'preact'
import { useRef } from 'preact/hooks'
import { useLineClamp } from '../hooks'

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
    const textRef = useRef<HTMLHeadingElement>(null)
    useLineClamp(textRef, 2)

    return (
        <div class="text-center p-3">
            <img
                src={coverImage}
                class="objec-fill w-36 max-w-xs rounded-lg shadow-xl mx-auto"
            />
            <h4 ref={textRef} class="text-white px-3 mt-4 mb-1">
                {episodeTitle}
            </h4>
            <span style={{ color: textColor }}>{podcastTitle}</span>
            <ProgressBar progress={progress} />
        </div>
    )
}
