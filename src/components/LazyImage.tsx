import 'intersection-observer'
import { FunctionalComponent, h } from 'preact'
import { useInView } from 'react-intersection-observer'

interface LazyImageProps {
    src: string
}

export const LazyImage: FunctionalComponent<LazyImageProps> = ({
    src,
}: LazyImageProps) => {
    const { ref, inView } = useInView({
        threshold: 0.5,
        triggerOnce: true,
    })

    const placeholder =
        "data:image/svg+xml,%3Csvg width='48' height='48' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='2' y='2' width='44' height='44' style='fill:%23dedede'/%3E%3Ctext x='50%25' y='50%25' font-size='14' text-anchor='middle' alignment-baseline='middle' font-family='monospace, sans-serif' fill='%23555555'%3E22PM%3C/text%3E%3C/svg%3E"

    return (
        <img
            ref={ref}
            class="object-fill w-48px h-48px rounded"
            src={inView ? src : undefined}
            alt=""
        />
    )
}
