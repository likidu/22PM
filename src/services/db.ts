import Dexie from 'dexie'
import { EditorPick } from '../types/api.type'

class XiaoyuzhouCache extends Dexie {
    // tokens!: Dexie.Table<RefreshToken, number>
    editorpicks!: Dexie.Table<EditorPick, number>

    constructor() {
        super('XiaoyuzhouCache')

        this.version(1).stores({
            editorpicks: '&date, picks',
        })

        // TODO: better way to create empty stores
        // If DB not exists, open it so it will not return error when trying to get data from it
        this.open().catch(error => console.error(error))
    }
}

const db = new XiaoyuzhouCache()

// export const getLastEditorPicksDate = async () => {
//     await db.editorpicks
// }

export const isEmptyCache = async (): Promise<boolean> => {
    let len = 0
    await db.transaction('r', db.editorpicks, async () => {
        len = await db.editorpicks.count()
    })
    return len === 0
}

export const addEditorPicks = async (data: EditorPick[]): Promise<number> =>
    await db.editorpicks.bulkPut(data)

export const getEditorPicks = async (): Promise<EditorPick[]> =>
    await db.editorpicks.orderBy('date').reverse().toArray()
