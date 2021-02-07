import { FunctionalComponent, h } from 'preact'
import {
    ChatbubbleOutline,
    EllipsisVertical,
    Information,
    MusicalNote,
    Play,
    Pause,
} from 'react-ionicons'

interface IconContainerProps {
    size?: number
    children: JSX.Element
}

const IconContainer: FunctionalComponent<IconContainerProps> = ({
    size = 24,
    children,
}: IconContainerProps) => {
    return (
        <div
            class={`flex m-3 justify-center items-center bg-white rounded-full shadow w-${size}px h-${size}px`}
        >
            {children}
        </div>
    )
}

export const IconChatbbble: FunctionalComponent = () => {
    return (
        <IconContainer>
            <ChatbubbleOutline color={'#000000'} width="16px" height="16px" />
        </IconContainer>
    )
}

export const IconEllipsisVertical: FunctionalComponent = () => {
    return (
        <IconContainer>
            <EllipsisVertical color={'#000000'} width="16px" height="16px" />
        </IconContainer>
    )
}

export const IconInformation: FunctionalComponent = () => {
    return (
        <IconContainer>
            <Information color={'#000000'} width="16px" height="16px" />
        </IconContainer>
    )
}

export const IconMusicalNote: FunctionalComponent = () => {
    return (
        <IconContainer>
            <MusicalNote color={'#000000'} width="16px" height="16px" />
        </IconContainer>
    )
}

export const IconPause: FunctionalComponent = () => {
    return (
        <IconContainer>
            <Pause color={'#000000'} width="16px" height="16px" />
        </IconContainer>
    )
}

export const IconPlay: FunctionalComponent = () => {
    return (
        <IconContainer>
            <Play color={'#000000'} width="16px" height="16px" />
        </IconContainer>
    )
}
