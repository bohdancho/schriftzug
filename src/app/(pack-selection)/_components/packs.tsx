'use client'

import { useOptimistic, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { toast } from 'sonner'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { type Pack } from '~/server/db/schema'
import { deletePack, createPack } from '~/server/queries'
import Link from 'next/link'
import { cn } from '~/lib/utils'
import { Trash } from 'lucide-react'

type MaybeOptimistic<T> = T & { optimistic?: boolean }
export function Packs({ packs, withCreateForm }: { packs: Pack[]; withCreateForm: boolean }) {
    const [optimisticPacks, setOptimisticPacks] = useOptimistic<MaybeOptimistic<Pack>[]>(packs)

    return (
        <>
            <ul className='grid grid-cols-[repeat(auto-fill,minmax(min(180px,40%),1fr))] gap-4'>
                {optimisticPacks.map((pack) => (
                    <li key={pack.id}>
                        <form
                            action={pack.optimistic ? undefined : () => deletePack(pack.id)}
                            className={cn(
                                'relative flex cursor-pointer flex-col items-center justify-center overflow-clip rounded-md border-2 p-2 text-center text-white shadow-md lg:p-4',
                                { 'pointer-events-none opacity-50': 'optimistic' in pack && pack.optimistic },
                            )}
                        >
                            <DeletePackButton className='absolute right-1 top-1' />
                            <Link href={`/play/${pack.id}`}>
                                <h2 className='p-2 lg:p-4'>{pack.name}</h2>
                            </Link>
                        </form>
                    </li>
                ))}
            </ul>
            {withCreateForm && <CreatePackForm setOptimisticPacks={setOptimisticPacks} />}
        </>
    )
}

export function CreatePackForm({
    setOptimisticPacks,
}: {
    setOptimisticPacks: (packs: MaybeOptimistic<Pack>[]) => void
}) {
    const [packName, setPackName] = useState('')

    async function clientAction() {
        if (packName.trim().length < 3) {
            toast.error('Pack name must be at least 3 characters long')
            return
        }

        toast.message('Generating a pack...', { id: 'creating-pack', duration: Infinity })
        const newPack = { name: packName, optimistic: true, id: Math.random() }

        setPackName('')
        setOptimisticPacks((prev) => [...prev, newPack])
        const res = await createPack(newPack.name)
        if (res.error) {
            toast.dismiss('creating-pack')
            toast.error(res.error)
            return
        }
        toast.dismiss('creating-pack')
        toast.success('Pack created')
    }

    return (
        <form action={clientAction} className='flex gap-4'>
            <Input
                type='text'
                value={packName}
                onChange={(e) => setPackName(e.target.value)}
                placeholder='Pack name'
                className='max-w-xs'
            />
            <SubmitButton />
        </form>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <Button type='submit' disabled={pending}>
            Generate
        </Button>
    )
}

export function DeletePackButton({ className }: { className?: string }) {
    const { pending } = useFormStatus()

    return (
        <Button type='submit' disabled={pending} variant='destructive' className={cn('p-2', className)}>
            <Trash />
        </Button>
    )
}
