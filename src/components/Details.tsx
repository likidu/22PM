import { FunctionalComponent, h } from 'preact'

interface DetailsProps {
    episodeTitle: string
    podcastTitle: string
    podcastLogo: string
    textColor: string
    shownotes: string
}

export const Details: FunctionalComponent<DetailsProps> = ({
    episodeTitle,
    podcastTitle,
    podcastLogo,
    textColor,
    shownotes,
}: DetailsProps) => {
    return (
        <div class="p-3">
            <img
                src={podcastLogo}
                class="objec-fill w-48 h-48 shadow-sm rounded"
            />
            <h2 class="my-2">{episodeTitle}</h2>
            <span class="my-2 text-secondary" style={{ color: textColor }}>
                {podcastTitle}
            </span>
            <div class="my-2" dangerouslySetInnerHTML={{ __html: shownotes }} />
        </div>
    )
}
