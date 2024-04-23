import Link from 'next/link'
import { deletePack, getAllPacks } from '~/server/queries'
import { currentUser } from '@clerk/nextjs/server'
import { isAdmin } from '~/lib/utils'
import { revalidatePath } from 'next/cache'
import { CreatePackForm } from './_components/create-pack-form'
import { DeletePackButton } from './_components/delete-pack-button'

export default async function PackSelectionPage() {
    const packs = await getAllPacks()
    const user = await currentUser()

    return (
        <main className='container flex flex-col gap-6 py-4 text-2xl'>
            <h1 className='text-2xl font-semibold leading-none tracking-tight md:text-4xl'>Choose a word pack:</h1>
            <div className='grid grid-cols-[repeat(auto-fill,minmax(min(180px,40%),1fr))] gap-4'>
                {packs.map((pack) => (
                    <form
                        key={pack.id}
                        action={async function () {
                            'use server'
                            await deletePack(pack.id)
                            revalidatePath('/')
                        }}
                        className='relative flex cursor-pointer flex-col items-center justify-center overflow-clip rounded-md border-2 p-2 text-center text-white shadow-md lg:p-4'
                    >
                        <DeletePackButton className='absolute right-1 top-1' />
                        <Link href={`/play/${pack.id}`}>
                            <h2 className='p-2 lg:p-4'>{pack.name}</h2>
                        </Link>
                    </form>
                ))}
            </div>

            {isAdmin(user) && <CreatePackForm />}
        </main>
    )
}
