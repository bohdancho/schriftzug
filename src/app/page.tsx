'use client'

import { toast } from 'sonner'
import { Button } from '~/components/ui/button'

export default function HomePage() {
    return (
        <main className='flex min-h-screen flex-col items-center justify-center gap-4 text-2xl'>
            Getting started with Schriftzug
            <Button onClick={() => toast('Hey! This is a toast.')}>
                Make a toast
            </Button>
        </main>
    )
}
