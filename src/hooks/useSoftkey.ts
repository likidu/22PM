import { useContext, useEffect } from 'preact/hooks'
import { SoftkeyContext } from '../contexts'
import { SoftkeyActionType, SoftkeyConfig } from '../types/softkey.type'

export const useSoftkey = <T>(
    origin: string,
    config: SoftkeyConfig,
    dependencies: T[] = [],
    replace = false,
): void => {
    const softkey = useContext(SoftkeyContext)

    if (softkey === undefined) {
        throw new Error(
            'useSoftkey must be used within a SoftkeyContext.Provider',
        )
    }

    useEffect(() => {
        softkey.dispatch({ type: SoftkeyActionType.PUSH, origin })
        return () => softkey.dispatch({ type: SoftkeyActionType.POP, origin })
    }, [origin])

    useEffect(() => {
        if (config) {
            const type = replace
                ? SoftkeyActionType.REPLACE
                : SoftkeyActionType.SET
            softkey.dispatch({ type, config })
        }
    }, dependencies)

    // return softkey
}
