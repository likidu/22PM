import { h, FunctionalComponent, Ref } from 'preact'
import { useEffect, useRef } from 'preact/hooks'
import type { SoftkeyConfig, KeyHandler } from '../types/softkey.type'

interface SoftkeyButtonProps {
    className: string
    handler: KeyHandler
    content: JSX.Element | string
}
const SoftkeyButton: FunctionalComponent<SoftkeyButtonProps> = ({
    className,
    handler,
    content,
}: SoftkeyButtonProps) => {
    return (
        <label class={className} onClick={handler}>
            {content}
        </label>
    )
}

// https://github.com/preactjs/preact/issues/1180
/**
 * Define a custom JSX element: softkey
 * It contains all the key event as attributes
 */
declare module 'preact' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    namespace createElement.JSX {
        interface IntrinsicElements {
            softkey: SoftkeyElement
        }
    }
}

interface SoftkeyElement {
    ref?: Ref<SoftkeyElement>
    onenter?: KeyHandler
    onsoftleft?: KeyHandler
    onsoftright?: KeyHandler
    onarrowdown?: KeyHandler
    onarrowup?: KeyHandler
    onarrowleft?: KeyHandler
    onarrowright?: KeyHandler
    onbackspace?: KeyHandler
}

// TODO: this should be the correct type for 'softkey', but it will miss the 'ref'
// interface SoftkeyAttributes<T> extends createElement.JSX.HTMLAttributes {}

/**
 * Softkey component
 * @param param0
 */
type SoftKeyElementEvents =
    | 'onenter'
    | 'onsoftleft'
    | 'onsoftright'
    | 'onarrowdown'
    | 'onarrowup'
    | 'onarrowleft'
    | 'onarrowright'
    | 'onbackspace'

export const Softkey: FunctionalComponent<SoftkeyConfig> = ({
    center,
    left,
    right,
    onKeyCenter,
    onKeyLeft,
    onKeyRight,
    onKeyArrowDown,
    onKeyArrowUp,
    onKeyArrowLeft,
    onKeyArrowRight,
    onKeyBackspace,
}: SoftkeyConfig) => {
    const softkeyRef = useRef<SoftkeyElement>(null)

    softkeyRef.current = {
        onenter: onKeyCenter,
        onsoftleft: onKeyLeft,
        onsoftright: onKeyRight,
        onarrowdown: onKeyArrowDown,
        onarrowup: onKeyArrowUp,
        onarrowleft: onKeyArrowLeft,
        onarrowright: onKeyArrowRight,
        onbackspace: onKeyBackspace,
    }

    const keys = [
        'Escape',
        'Enter',
        'SoftLeft',
        'SoftRight',
        'ArrowUp',
        'ArrowDown',
        'ArrowLeft',
        'ArrowRight',
        'Backspace',
    ]

    const parseKey = (ev: KeyboardEvent) => {
        // Simulate soft keys for testing purposes
        if (ev.shiftKey && ev.key === 'ArrowLeft') {
            return 'SoftLeft'
        }
        if (ev.shiftKey && ev.key === 'ArrowRight') {
            return 'SoftRight'
        }
        return ev.key.toString()
    }

    const onKeyDown = (ev: KeyboardEvent) => {
        const key = parseKey(ev)
        if (!keys.includes(key)) return

        // Map: SoftLeft => onsoftleft
        const kev = `on${key.toLowerCase()}`
        const action = softkeyRef.current[kev as SoftKeyElementEvents]

        if (action) {
            action(ev)
            ev.stopPropagation()
            ev.preventDefault()
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown)
        return () => document.removeEventListener('keydown', onKeyDown)
    }, [])

    return (
        <footer class="absolute bottom-0 flex items-center w-full max-w-full">
            <softkey ref={softkeyRef} />
            {left && onKeyLeft && (
                <SoftkeyButton
                    key="left"
                    className="flex justify-start font-semibold w-full truncate"
                    handler={onKeyLeft}
                    content={left}
                />
            )}
            {center && onKeyCenter && (
                <SoftkeyButton
                    key="center"
                    className="font-bold text-center min-w-1/4 truncate uppercase"
                    handler={onKeyCenter}
                    content={center}
                />
            )}
            {right && onKeyRight && (
                <SoftkeyButton
                    key="right"
                    className="flex justify-end font-semibold w-full truncate"
                    handler={onKeyRight}
                    content={right}
                />
            )}
        </footer>
    )
}
