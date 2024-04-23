'use client'

import { useState } from 'react'
<<<<<<< HEAD
=======
import { useFormStatus } from 'react-dom'
>>>>>>> main
import { toast } from 'sonner'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { createPack } from '~/server/queries'

export function CreatePackForm() {
    const [packName, setPackName] = useState('')

<<<<<<< HEAD
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        toast.message('Creating a pack...')
=======
    async function handleSubmit() {
        toast.message('Creating a pack...', { id: 'creating-pack', duration: Infinity })
>>>>>>> main
        if (packName.trim().length < 3) {
            toast.error('Pack name must be at least 3 characters long')
        }
        try {
            await createPack(packName)
<<<<<<< HEAD
            toast.success('Pack created')
            window.location.reload()
            // TODO: refetch
        } catch (err) {
            const error = err as { message?: string }
            toast.error(error.message ?? 'An error occurred')
=======
            toast.dismiss('creating-pack')
            toast.success('Pack created')
            // TODO: refetch
        } catch (err) {
            const error = err as { message?: string }
            toast.dismiss('creating-pack')
            toast.error(error.message ?? 'An unknown error occurred while creating a pack')
>>>>>>> main
        }
    }

    return (
<<<<<<< HEAD
        <form onSubmit={handleSubmit} className='flex gap-4'>
=======
        <form action={handleSubmit} className='flex gap-4'>
>>>>>>> main
            <Input
                type='text'
                value={packName}
                onChange={(e) => setPackName(e.target.value)}
                placeholder='Pack name'
                className='max-w-xs'
            />
<<<<<<< HEAD
            <Button type='submit'>Generate a pack</Button>
        </form>
    )
}
=======
            <SubmitButton />
        </form>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <Button type='submit' disabled={pending}>
            Generate a pack
        </Button>
    )
}
>>>>>>> main
