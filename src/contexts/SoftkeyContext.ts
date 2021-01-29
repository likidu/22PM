import { createContext } from 'preact'
import type { SoftkeyAction, SoftkeyState } from '../types/softkey.type'

interface SoftkeyContextProps {
    softkey: SoftkeyState
    dispatch: (action: SoftkeyAction) => void
}

export const SoftkeyContext = createContext<SoftkeyContextProps>({} as never)
