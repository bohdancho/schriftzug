'use client'

import { Trash } from 'lucide-react'
import { useFormStatus } from 'react-dom'
import { Button } from '~/components/ui/button'
import { cn } from '~/lib/utils'

export function DeletePackButton({ className }: { className?: string }) {
    const { pending } = useFormStatus()

    return (
        <Button type='submit' disabled={pending} variant='destructive' className={cn('p-2', className)}>
            <Trash />
        </Button>
    )
}
