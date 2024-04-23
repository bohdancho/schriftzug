'use client'

import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { toast } from 'sonner'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { createPack } from '~/server/queries'

export function CreatePackForm() {
    const [packName, setPackName] = useState('')

    async function handleSubmit() {
        toast.message('Creating a pack...')
        if (packName.trim().length < 3) {
            toast.error('Pack name must be at least 3 characters long')
        }
        try {
            await createPack(packName)
            toast.success('Pack created')
            // TODO: refetch
        } catch (err) {
            const error = err as { message?: string }
            toast.error(error.message ?? 'An error occurred')
        }
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
            Generate a pack
        </Button>
    )
}
