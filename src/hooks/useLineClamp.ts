/**
 * Firefox <64 does not support -webkit-clint-clamp
 * Polyfill has to be used
 */

import { RefObject } from 'preact'
import { useEffect } from 'preact/hooks'
import { webkitLineClamp } from 'webkit-line-clamp'

export const useLineClamp = <T extends HTMLElement>(
    ref: RefObject<T>,
    lines: number,
): void => {
    useEffect(() => {
        if (ref.current) webkitLineClamp(ref.current, lines)
    }, [])
}
