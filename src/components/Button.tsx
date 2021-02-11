import { FunctionalComponent, h } from 'preact'

interface ButtonProps {
    text: string
    handleClick: (ev: Event) => void
    uid: string
}

export const Button: FunctionalComponent<ButtonProps> = ({
    text,
    handleClick,
    uid,
}: ButtonProps) => {
    return (
        <div class="px-3 py-1.5">
            <button
                type="button"
                onClick={handleClick}
                data-selectable
                data-selected-uid={uid}
                class="text-primary text-center w-full p-1.5 border-2 border-gray-400 focus:border-0 rounded-full mx-auto"
            >
                {text}
            </button>
        </div>
    )
}
