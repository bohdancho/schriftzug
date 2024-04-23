import { Undo2 } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from '~/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '~/components/ui/card'
import { Input } from '~/components/ui/input'

export function StartScreen({
    durationSec,
    onDurationChange,
    onStart,
}: {
    durationSec: number
    onDurationChange: (v: number) => void
    onStart: () => void
}) {
    const [debouncedDuration, setDebouncedDuration] = useState(String(durationSec))

    useEffect(() => {
        const duration = +debouncedDuration
        if (isNaN(duration) || duration < 0) return // TODO: validation with react-hook-form
        onDurationChange(duration)
    }, [debouncedDuration, onDurationChange])

    return (
        <div className='container flex flex-1 items-center justify-center'>
            <Card className='w-[fit-content]'>
                <CardHeader className='gap-2'>
                    <CardTitle>
                        <span className='whitespace-nowrap'>Press START</span>{' '}
                        <span className='whitespace-nowrap'>whenever you are ready</span>
                    </CardTitle>
                    <CardDescription className='text-xl'>
                        Explain as many words as possible without using same-root words.
                        <span className='block'>
                            Game duration:
                            <Input
                                className='inline w-10 p-1 text-center'
                                value={debouncedDuration}
                                onChange={(e) => setDebouncedDuration(e.target.value)}
                            />
                            seconds
                        </span>
                    </CardDescription>
                </CardHeader>
                <CardFooter className='justify-center gap-2'>
                    <Button className='gap-2' onClick={onStart}>
                        START
                    </Button>
                    <Button variant='destructive' size='icon' asChild>
                        <Link href='/'>
                            <Undo2 />
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
