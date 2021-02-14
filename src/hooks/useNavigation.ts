import { RefObject } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import { useSoftkey } from '../hooks'

interface CurrentElement {
    type: string
    index: number
    uid: string | null
}

export const useNavigation = (
    origin: string,
    containerRef: RefObject<HTMLDivElement>,
    listRef: RefObject<HTMLDivElement>,
    axis: 'x' | 'y',
    elementsSelector = '[data-selectable]',
): [CurrentElement, (index: number) => void, () => CurrentElement] => {
    const [current, setCurrent] = useState<CurrentElement>({
        type: '',
        index: 0,
        uid: null,
    })

    const getAllElements = () =>
        containerRef?.current?.querySelectorAll<HTMLElement>(elementsSelector)

    const getSelectedElement = () =>
        containerRef?.current?.querySelector<HTMLElement>('[nav-selected=true]')

    const getTheIndexOfTheSelectedElement = () => {
        const element = getSelectedElement()
        if (!element) throw new Error('useNavigation: no elemented selected')

        const index = element.getAttribute('nav-index')
        return element && index ? parseInt(index) : 0
    }

    const setNavigation = (index: number) => {
        const allElements = getAllElements()
        if (!allElements) throw new Error('useNavigation: no elementes')

        selectElement(allElements[index] || document.body)
    }

    const navigatePrevious = () => {
        const allElements = getAllElements()
        if (!allElements) throw new Error('useNavigation: no elementes')

        const currentIndex = getTheIndexOfTheSelectedElement()

        const setIndex =
            currentIndex === 0 ? allElements.length - 1 : currentIndex - 1
        return selectElement(allElements[setIndex] || allElements[0], setIndex)
    }

    const navigateNext = () => {
        const allElements = getAllElements()
        if (!allElements) throw new Error('useNavigation: no elementes')

        const currentIndex = getTheIndexOfTheSelectedElement()

        const setIndex =
            currentIndex + 1 > allElements.length - 1 ? 0 : currentIndex + 1
        return selectElement(allElements[setIndex] || allElements[0], setIndex)
    }

    const focusElement = (selected: boolean, el: HTMLInputElement) => {
        if (selected) {
            el.focus()
            el.selectionStart = el.selectionEnd = el.value.length
        } else {
            el.blur()
        }
    }

    const selectElement = (selectElement: HTMLElement, setIndex = 0) => {
        if (selectElement) {
            ;[].forEach.call(
                getAllElements(),
                (element: HTMLElement, index) => {
                    const selectThisElement = element === selectElement
                    element.setAttribute(
                        'nav-selected',
                        selectThisElement ? 'true' : 'false',
                    )
                    element.setAttribute('nav-index', index.toString())

                    if (
                        element.nodeName === 'INPUT' ||
                        element.nodeName === 'TEXTAREA'
                    ) {
                        focusElement(
                            selectThisElement,
                            <HTMLInputElement>element,
                        )
                    }
                    if (element.getElementsByTagName('INPUT').length > 0) {
                        focusElement(
                            selectThisElement,
                            <HTMLInputElement>(
                                element.getElementsByTagName('INPUT')[0]
                            ),
                        )
                    }
                },
            )
            setCurrent({
                type: selectElement.tagName,
                index: setIndex,
                uid: selectElement.getAttribute('data-selected-uid'),
            })
        } else {
            setNavigation(0)
        }
    }

    const getCurrent = () => {
        const element = getSelectedElement()
        if (!element) throw new Error('useNavigation: no elemented selected')

        const index = element.getAttribute('nav-index')
        if (!index)
            throw new Error('useNavigation: no index for selected element')

        return {
            type: element.tagName,
            index: parseInt(index),
            uid: element.getAttribute('data-selected-uid'),
        }
    }

    const previousKey = axis === 'x' ? 'onKeyArrowLeft' : 'onKeyArrowUp'
    const nextKey = axis === 'x' ? 'onKeyArrowRight' : 'onKeyArrowDown'
    useSoftkey(origin, {
        [previousKey]: navigatePrevious,
        [nextKey]: navigateNext,
    })

    useEffect(() => {
        if (!listRef.current) return
        const element = getSelectedElement()
        if (!element) return
        if (element.tagName === 'INPUT') return

        // TODO: cache the next line since it doesn't change
        const containerRect = listRef.current.getBoundingClientRect()
        const rect = element.getBoundingClientRect()

        if (rect.bottom > containerRect.bottom) {
            // scroll down
            listRef.current.scrollTop += rect.bottom - containerRect.bottom
        }
        if (rect.top < containerRect.top) {
            // scroll up
            listRef.current.scrollTop -= containerRect.top - rect.top
        }
    })

    return [current, setNavigation, getCurrent]
}
