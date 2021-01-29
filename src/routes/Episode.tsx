import { FunctionalComponent, h } from 'preact'
import { route } from 'preact-router'
import { useRef, useEffect, useState } from 'preact/hooks'

import { Content } from '../components'

const Episode: FunctionalComponent = () => {
    const containerRef = useRef<HTMLDivElement>(null)

    const onKeyDown = (ev: KeyboardEvent) => {
        if (ev.key.toString() === 'Backspace') route('/')
    }

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown)
        return () => document.removeEventListener('keydown', onKeyDown)
    }, [])

    return (
        <Content containerRef={containerRef} title="Episode">
            <h1>Episode</h1>
        </Content>
    )
}

export default Episode
