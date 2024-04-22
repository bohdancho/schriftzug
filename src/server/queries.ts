import { db } from './db'
import { pack, word } from './db/schema'
import { generatePackWords } from './llm'

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
        where: (word, { eq }) => eq(word.packId, id),
        orderBy: (_, { sql }) => sql`random()`,
    })
    return pack
}

export async function createPack(name: string) {
    console.log(`Creating pack "${name}"`)
    const words = await generatePackWords(name, 50)
    if (!words) {
        throw new Error('Failed to generate words')
    }

    const newPack = await db
        .insert(pack)
        .values({
            name,
            imgUrl: 'https://picsum.photos/200',
        })
        .returning({ insertedId: pack.id })
    const newPackId = newPack[0]?.insertedId
    if (!newPackId) {
        throw new Error('Failed to create pack')
    }

    await db.insert(word).values(
        words.map((value) => ({
            value,
            packId: newPackId,
        })),
    )
}
