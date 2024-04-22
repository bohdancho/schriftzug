'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { createPack } from '~/server/queries'

export function CreatePackForm() {
    const [packName, setPackName] = useState('')

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        toast.message('Creating a pack...')
        if (packName.trim().length < 3) {
            toast.error('Pack name must be at least 3 characters long')
        }
        try {
            await createPack(packName)
            toast.success('Pack created')
            window.location.reload()
            // TODO: refetch
        } catch (err) {
            const error = err as { message?: string }
            toast.error(error.message ?? 'An error occurred')
        }
    }

    return (
        <form onSubmit={handleSubmit} className='flex gap-4'>
            <Input
                type='text'
                value={packName}
                onChange={(e) => setPackName(e.target.value)}
                placeholder='Pack name'
                className='max-w-xs'
            />
            <Button type='submit'>Generate a pack</Button>
        </form>
    )
}
