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
    return db.query.pack.findFirst({
        where: (model, { eq }) => eq(model.id, id),
    })
}

export async function getPackByIdWithWords(id: number) {
    return db.query.pack.findFirst({
        where: (model, { eq }) => eq(model.id, id),
        with: { words: true },
    })
}

export async function createPack(name: string) {
    const user = await currentUser()
    if (!isAdmin(user)) {
        return { error: 'Unauthorized' }
    }

    console.log(`Creating pack "${name}"`)
    const words = await generatePackWords(name, 50)
    if (!words) {
        return { error: 'Failed to generate words' }
    }

    const newPack = await db.insert(pack).values({ name }).returning({ insertedId: pack.id })
    const newPackId = newPack[0]?.insertedId
    if (!newPackId) {
        return { error: 'Failed to create pack' }
    }

    await db.insert(word).values(
        words.map((value) => ({
            value,
            packId: newPackId,
        })),
    )

    revalidatePath('/')
    return { ok: true }
}

export async function deletePack(id: number) {
    const user = await currentUser()
    if (!isAdmin(user)) {
        throw new Error('Unauthorized')
    }

    console.log(`Deleting pack ${id}`)
    await db.delete(pack).where(eq(pack.id, id))

    revalidatePath('/')
}
