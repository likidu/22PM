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
    size: number
    children: JSX.Element
}

const IconContainer: FunctionalComponent<IconContainerProps> = ({
    size,
    children,
}: IconContainerProps) => {
    return (
        // TODO: make Tailwind CSS customized size work.
        // Now it seems the customized 'w-24' is not working in Firefox 48
        <div
            class={`flex m-3 justify-center items-center bg-white rounded-full shadow`}
            style={{ width: `${size}px`, height: `${size}px` }}
        >
            {children}
        </div>
    )
}

interface IconProps {
    size?: number
}

export const IconChatbbble: FunctionalComponent<IconProps> = ({
    size = 16,
}: IconProps) => {
    return (
        <IconContainer size={size + 8}>
            <ChatbubbleOutline
                color={'#000000'}
                width={`${size}px`}
                height={`${size}px`}
            />
        </IconContainer>
    )
}

export const IconEllipsisVertical: FunctionalComponent<IconProps> = ({
    size = 16,
}: IconProps) => {
    return (
        <IconContainer size={size + 8}>
            <EllipsisVertical
                color={'#000000'}
                width={`${size}px`}
                height={`${size}px`}
            />
        </IconContainer>
    )
}

export const IconInformation: FunctionalComponent<IconProps> = ({
    size = 16,
}: IconProps) => {
    return (
        <IconContainer size={size + 8}>
            <Information
                color={'#000000'}
                width={`${size}px`}
                height={`${size}px`}
            />
        </IconContainer>
    )
}

export const IconMusicalNote: FunctionalComponent<IconProps> = ({
    size = 16,
}: IconProps) => {
    return (
        <IconContainer size={size + 8}>
            <MusicalNote
                color={'#000000'}
                width={`${size}px`}
                height={`${size}px`}
            />
        </IconContainer>
    )
}

export const IconPause: FunctionalComponent<IconProps> = ({
    size = 16,
}: IconProps) => {
    return (
        <IconContainer size={size + 8}>
            <Pause color={'#000000'} width={`${size}px`} height={`${size}px`} />
        </IconContainer>
    )
}

export const IconPlay: FunctionalComponent<IconProps> = ({
    size = 16,
}: IconProps) => {
    return (
        <IconContainer size={size + 8}>
            <Play color={'#000000'} width={`${size}px`} height={`${size}px`} />
        </IconContainer>
    )
}
