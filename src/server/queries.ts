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
