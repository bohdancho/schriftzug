import { getAllPacks } from '~/server/queries'
import { currentUser } from '@clerk/nextjs/server'
import { isAdmin } from '~/lib/utils'
import { Packs } from './_components/packs'

export default async function PackSelectionPage() {
    const packs = await getAllPacks()
    const user = await currentUser()

    return (
        <main className='container flex flex-col gap-6 py-4 text-2xl'>
            <h1 className='text-2xl font-semibold leading-none tracking-tight md:text-4xl'>Choose a word pack:</h1>
            <Packs packs={packs} withCreateForm={isAdmin(user)} />
        </main>
    )
}
