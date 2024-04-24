import { getAllPacks } from '~/server/queries'
import { currentUser } from '@clerk/nextjs/server'
import { isAdmin } from '~/lib/utils'
import { Packs } from './_components/packs'
import { Suspense } from 'react'

export default async function PackSelectionPage() {
    return (
        <main className='container flex flex-col gap-6 py-4 text-2xl'>
            <h1 className='text-2xl font-semibold leading-none tracking-tight md:text-4xl'>Choose a word pack:</h1>
            <Suspense fallback={<p>Loading...</p>}>
                <PacksWrapper />
            </Suspense>
        </main>
    )
}

async function PacksWrapper() {
    const user = await currentUser()
    const packs = await getAllPacks()
    return <Packs packs={packs} withCreateDeleteRights={isAdmin(user)} />
}
