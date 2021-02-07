import 'intersection-observer'
import { FunctionalComponent, h } from 'preact'
import { useInView } from 'react-intersection-observer'

interface LazyImageProps {
    src: string
}

export const LazyImage: FunctionalComponent<LazyImageProps> = ({
    src,
}: LazyImageProps) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const { ref, inView } = useInView({
        threshold: 0.5,
        triggerOnce: true,
    })

    // 1x1 empty gif
    const placeholder =
        'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='

    return (
        <img
            ref={ref}
            class="object-fill w-48 h-48 rounded"
            src={inView ? src : undefined}
            alt=""
        />
    )
}
