import { FunctionalComponent, h } from 'preact'

interface DetailsProps {
    episodeTitle: string
    podcastTitle: string
    podcastLogo: string
    shownotes: string
}

export const Details: FunctionalComponent<DetailsProps> = ({
    episodeTitle,
    podcastTitle,
    podcastLogo,
    shownotes,
}: DetailsProps) => {
    return (
        <div class="p-3">
            <img
                src={podcastLogo}
                class="objec-fill w-48 h-48 shadow rounded"
            />
            <h4 class="my-2">{episodeTitle}</h4>
            <span class="text-gray-400 my-2">{podcastTitle}</span>
            <div class="my-2" dangerouslySetInnerHTML={{ __html: shownotes }} />
        </div>
    )
}
