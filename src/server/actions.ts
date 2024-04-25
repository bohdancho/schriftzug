'use server'

import { currentUser } from '@clerk/nextjs/server'
import { db } from './db'
import { pack, word } from './db/schema'
import { isAdmin } from '~/lib/utils'
import { asc, eq, sql } from 'drizzle-orm'
import { unstable_cache as cache, revalidateTag } from 'next/cache'

const ALL_PACKS_TAG = 'all-packs'

export const getAllPacks = cache(async () => db.query.pack.findMany({ orderBy: asc(pack.id) }), [ALL_PACKS_TAG])

export async function getPackById(id: number) {
    return db.query.pack.findFirst({
        where: (model, { eq }) => eq(model.id, id),
    })
}

export async function getPackWords(packId: number) {
    return db
        .select()
        .from(word)
        .where(eq(word.packId, packId))
        .orderBy(sql`random()`)
}

export async function createPack(name: string): Promise<{ error?: string }> {
    const user = await currentUser()
    if (!isAdmin(user)) {
        return { error: 'Unauthorized' }
    }

    console.log(`Creating pack "${name}"`)
    // const words = await generatePackWords(name, 50)
    const words = ['word1', 'word2', 'word3', 'word4', 'word5']
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

    revalidateTag(ALL_PACKS_TAG)
    return {}
}

export async function deletePack(id: number): Promise<{ error?: string }> {
    const user = await currentUser()
    if (!isAdmin(user)) {
        return { error: 'Unauthorized' }
    }

    console.log(`Deleting pack ${id}`)
    await db.delete(pack).where(eq(pack.id, id))

    revalidateTag(ALL_PACKS_TAG)
    return {}
}
