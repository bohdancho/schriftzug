import Link from 'next/link'
import { toast } from 'sonner'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { createPack, getAllPacks } from '~/server/queries'
import { currentUser } from '@clerk/nextjs/server'

export default async function PackSelectionPage() {
    const packs = await getAllPacks()
    const user = await currentUser()

    return (
        <main className='container flex flex-col gap-6 py-4 text-2xl'>
            <h1 className='text-2xl font-semibold leading-none tracking-tight md:text-4xl'>Choose a word pack:</h1>
            <div className='grid grid-cols-[repeat(auto-fill,minmax(min(180px,40%),1fr))] gap-4'>
                {packs.map((pack) => (
                    <Link
                        href={`/play/${pack.id}`}
                        key={pack.name}
                        className='flex cursor-pointer flex-col items-center justify-center overflow-clip rounded-md border-2 p-2 text-center text-white shadow-md lg:p-4'
                    >
                        <h2 className='p-2 lg:p-4'>{pack.name}</h2>
                    </Link>
                ))}
            </div>

            {user?.privateMetadata.isAdmin ? (
                <form
                    action={async (formData: FormData) => {
                        'use server'

                        const packName = formData.get('packName') as string
                        await createPack(packName)
                    }}
                    className='flex gap-4'
                >
                    <Input type='text' name='packName' placeholder='Pack name' className='max-w-xs' />
                    <Button type='submit'>Generate a pack</Button>
                </form>
            ) : null}
        </main>
    )
}
