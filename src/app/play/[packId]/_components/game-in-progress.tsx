import { type Pack } from '~/server/db/schema'
import { type GameResult } from '.'
import { useEffect, useState } from 'react'
import { Button } from '~/components/ui/button'
import { env } from '~/env'

const DEFAULT_GAME_DURATION = env.NEXT_PUBLIC_ENV === 'development' ? 999999999 : 60
export function GameInProgress({ pack, onEnd }: { pack: Pack; onEnd: (result: GameResult) => void }) {
    const [currentWordIdx, setCurrentWordIdx] = useState(0)
    const [result, setResult] = useState<boolean[]>([])

    function handleTurn(guessed: boolean) {
        setCurrentWordIdx((prev) => prev + 1)
        setResult([...result, guessed])
    }

    function handleTimeout() {
        onEnd({ guessedWords: result })
    }

    if (currentWordIdx === pack.words.length) {
        onEnd({ guessedWords: result, noMoreWords: true })
        return
    }

    return (
        <div className='container relative h-full'>
            <div className='relative grid h-full grid-cols-2'>
                <div className='absolute z-10 w-full rounded-b-xl border-b border-primary-foreground bg-black/70 pb-8 pt-6 text-center text-5xl'>
                    {pack.words[currentWordIdx]}
                </div>
                <Button className='h-full text-5xl' onClick={() => handleTurn(false)}>
                    Skip
                </Button>
                <Button className='h-full text-5xl' onClick={() => handleTurn(true)} variant='destructive'>
                    Guessed
                </Button>
                <Timer onTimeout={handleTimeout} duration={DEFAULT_GAME_DURATION} className='absolute z-10' />
            </div>
        </div>
    )
}

function Timer({ duration, onTimeout, className }: { duration: number; onTimeout: () => void; className?: string }) {
    const [timeLeft, setTimeLeft] = useState(duration)

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prev) => prev - 1)
        }, 1000)

        if (timeLeft <= 0) {
            clearInterval(interval)
            onTimeout()
        }

        return () => clearInterval(interval)
    }, [timeLeft, onTimeout])

    return <div className={className}>{timeLeft}</div>
}
