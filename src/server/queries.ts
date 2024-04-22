import { db } from './db'

export async function getAllPacks() {
    return db.query.pack.findMany()
}

export async function getPackById(id: number) {
    const pack = await db.query.pack.findFirst({
        where: (model, { eq }) => eq(model.id, id),
    })
    return pack
}

export async function getWordsByPackId(id: number) {
    const pack = await db.query.word.findMany({
        where: (model, { eq }) => eq(model.packId, id),
    })
    return pack
}
