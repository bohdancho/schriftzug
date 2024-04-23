'use server'

import { currentUser } from '@clerk/nextjs/server'
import { db } from './db'
import { pack, word } from './db/schema'
import { generatePackWords } from './llm'
import { isAdmin } from '~/lib/utils'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

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
    const user = await currentUser()
    if (!isAdmin(user)) {
        throw new Error('Unauthorized')
    }

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

    revalidatePath('/')
}

export async function deletePack(id: number) {
    const user = await currentUser()
    if (!isAdmin(user)) {
        throw new Error('Unauthorized')
    }

    console.log(`Deleting pack ${id}`)
    await db.delete(word).where(eq(word.packId, id))
    await db.delete(pack).where(eq(pack.id, id))
}
