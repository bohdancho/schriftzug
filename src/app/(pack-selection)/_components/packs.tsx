'use client'

import { useOptimistic, startTransition, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { toast } from 'sonner'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { type Pack } from '~/server/db/schema'
import { deletePack, createPack } from '~/server/actions'
import Link from 'next/link'
import { cn } from '~/lib/utils'
import { Trash } from 'lucide-react'

type MaybeOptimistic<T> = T & { optimistic?: boolean }
export function Packs({ packs, withCreateDeleteRights }: { packs: Pack[]; withCreateDeleteRights: boolean }) {
    const [optimisticPacks, setOptimisticPacks] = useOptimistic<MaybeOptimistic<Pack>[]>(packs)

    async function handleDeletePack(id: number) {
        startTransition(() =>
            setOptimisticPacks((prev) => prev.map((pack) => (pack.id === id ? { ...pack, optimistic: true } : pack))),
        )
        const { error } = await deletePack(id)
        if (error) {
            toast.error(error)
            return
        }
    }

    return (
        <>
            <ul className='grid grid-cols-[repeat(auto-fill,minmax(min(180px,40%),1fr))] gap-4'>
                {optimisticPacks.map((pack) => (
                    <li
                        key={pack.id}
                        className={cn('relative', {
                            'pointer-events-none opacity-50': 'optimistic' in pack && pack.optimistic,
                        })}
                    >
                        {withCreateDeleteRights && (
                            <Button
                                type='submit'
                                onClick={() => handleDeletePack(pack.id)}
                                variant='destructive'
                                className='absolute right-1 top-1 p-2'
                            >
                                <Trash />
                            </Button>
                        )}
                        <Link
                            href={`/play/${pack.id}`}
                            className='flex flex-col items-center justify-center rounded-md border-2 p-2 text-center text-white shadow-md lg:p-4'
                        >
                            <h2 className='p-2 lg:p-4'>{pack.name}</h2>
                        </Link>
                    </li>
                ))}
            </ul>
            {withCreateDeleteRights && <CreatePackForm setOptimisticPacks={setOptimisticPacks} />}
        </>
    )
}

export function CreatePackForm({
    setOptimisticPacks,
}: {
    setOptimisticPacks: (packs: MaybeOptimistic<Pack>[]) => void
}) {
    const [packName, setPackName] = useState('')

    async function handleSubmit() {
        if (packName.trim().length < 3) {
            toast.error('Pack name must be at least 3 characters long')
            return
        }

        toast.message('Generating a pack...', { id: 'creating-pack', duration: Infinity })
        const newPack = { name: packName, optimistic: true, id: Math.random() }

        setPackName('')
        // @ts-expect-error typescript doesn't like this for some reason
        startTransition(() => setOptimisticPacks((prev: MaybeOptimistic<Pack>[]) => [...prev, newPack]))

        const { error } = await createPack(newPack.name)
        // TODO: figure out why this blocks navigation

        if (error) {
            toast.dismiss('creating-pack')
            toast.error(error)
            return
        }
        toast.dismiss('creating-pack')
        toast.success('Pack created')
    }

    return (
        <form action={handleSubmit} className='flex gap-4'>
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
