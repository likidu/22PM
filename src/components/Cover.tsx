import { FunctionalComponent, h } from 'preact'
import { useRef } from 'preact/hooks'
import { useLineClamp } from '../hooks'

import { ProgressBar } from './ProgressBar'

interface CoverProps {
    episodeTitle: string
    podcastTitle: string
    current: number
    duration: number
    coverImage: string
    textColor: string
    progress: number
}

export const Cover: FunctionalComponent<CoverProps> = ({
    episodeTitle,
    podcastTitle,
    current,
    duration,
    coverImage,
    textColor,
    progress,
}: CoverProps) => {
    const headerRef = useRef<HTMLHeadingElement>(null)
    const textRef = useRef<HTMLParagraphElement>(null)
    useLineClamp(headerRef, 2)
    useLineClamp(textRef, 1)

    const convertSeconds = (s: number) => {
        let secs = s
        const hrs = Math.floor(secs / 3600)
        secs -= hrs * 3600

        const mins = Math.floor(secs / 60)
        secs -= mins * 60
        secs = Math.floor(secs)

        const hours = hrs > 0 ? `${hrs}:` : ''
        const minutes = mins < 10 ? `0${mins}:` : `${mins}:`
        const seconds = secs < 10 ? `0${secs}` : secs
        return `${hours}${minutes}${seconds}`
    }

    return (
        <div class="text-center p-3">
            <img
                src={coverImage}
                class="objec-fill w-36 max-w-xs rounded-lg shadow-xl mx-auto"
            />
            <div class="mt-2">
                <div class="flex justify-between text-tertiary text-white">
                    <span>{convertSeconds(current)}</span>
                    <span>-{convertSeconds(duration - current)}</span>
                </div>
                <ProgressBar progress={progress} />
            </div>
            <p ref={headerRef} class="text-primary text-white px-3 mt-3 mb-1">
                {episodeTitle}
            </p>
            <p
                ref={textRef}
                class="text-secondary"
                style={{ color: textColor }}
            >
                {podcastTitle}
            </p>
        </div>
    )
}
