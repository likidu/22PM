import { FunctionalComponent, h, RefObject } from 'preact'

interface InputProps {
    label: string
    name: string
    placeholder: string
    value: string
    handleInput: (ev: Event) => void
}

export const Input: FunctionalComponent<InputProps> = ({
    label,
    name,
    placeholder,
    value,
    handleInput,
}: InputProps) => {
    return (
        <div class="px-3 py-1.5" data-selectable>
            <label class="text-secondary">{label}</label>
            <input
                type="text"
                name={name}
                id={name}
                placeholder={placeholder}
                value={value}
                onInput={handleInput}
                class="text-primary text-gray-700 w-full p-1.5 border border-solid border-gray-400 focus:border-gray-300 focus:border shadow-none rounded-none appearance-none"
            />
        </div>
    )
}
