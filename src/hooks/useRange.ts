import { useState } from 'preact/hooks'

export const useRange = (
    initialValue: number,
    range: number,
): [number, () => void, () => void, (newValue: number) => void] => {
    const [value, setValue] = useState(initialValue)

    const [min, max] = Array.isArray(range) ? range : [0, range]
    const setRangeValue = (newValue: number) => {
        if (newValue < min) {
            setValue(min)
        } else if (newValue > max) {
            setValue(max)
        } else {
            setValue(newValue)
        }
    }

    const setPrevValue = () => {
        setRangeValue(value - 1)
    }

    const setNextValue = () => {
        setRangeValue(value + 1)
    }

    return [value, setPrevValue, setNextValue, setRangeValue]
}
