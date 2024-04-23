import { Undo2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '~/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '~/components/ui/card'

export function StartScreen({ durationSec, onStart }: { durationSec: number; onStart: () => void }) {
    return (
        <div className='container flex flex-1 items-center justify-center'>
            <Card className='w-[fit-content]'>
                <CardHeader className='gap-2'>
                    <CardTitle>
                        <span className='whitespace-nowrap'>Press START</span>{' '}
                        <span className='whitespace-nowrap'>whenever you are ready</span>
                    </CardTitle>
                    <CardDescription className='text-xl'>
                        Rules: {durationSec}s, explain as many words as possible without using same-root words.
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
