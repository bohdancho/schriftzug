import type { Word, Pack } from '~/server/db/schema'
import { type GameResult } from '.'
import { useEffect, useState } from 'react'
import { Button } from '~/components/ui/button'
import { env } from '~/env'

const DEFAULT_GAME_DURATION = env.NEXT_PUBLIC_ENV === 'development' ? 5 : 60
export function GameInProgress({ words, onEnd }: { words: Word[]; onEnd: (result: GameResult) => void }) {
    const [currentWordIdx, setCurrentWordIdx] = useState(0)
    const [result, setResult] = useState<boolean[]>([])

    function handleTurn(guessed: boolean) {
        setCurrentWordIdx((prev) => prev + 1)
        setResult([...result, guessed])
    }

    function handleTimeout() {
        onEnd({ guessedWords: result })
    }

    if (currentWordIdx === words.length) {
        onEnd({ guessedWords: result, noMoreWords: true })
        return
    }

    return (
        <div className='container relative h-full'>
            <div className='relative grid h-full grid-cols-2'>
                <div className='absolute z-10 w-full rounded-b-xl border-b border-primary-foreground bg-black/70 pb-8 pt-6 text-center text-5xl'>
                    {words[currentWordIdx]!.value}
                </div>
                <Button className='h-full text-4xl md:text-5xl' onClick={() => handleTurn(false)} variant='destructive'>
                    Skip
                </Button>
                <Button className='h-full text-4xl md:text-5xl' onClick={() => handleTurn(true)}>
                    Guessed
                </Button>
                <Timer
                    onTimeout={handleTimeout}
                    duration={DEFAULT_GAME_DURATION}
                    className='pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 font-mono text-5xl'
                />
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

    return <div className={className}>{formatTime(timeLeft)}</div>
}

function formatTime(time: number) {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    const minutesString = minutes.toString().padStart(2, '0')
    const secondsString = seconds.toString().padStart(2, '0')

    return `${minutesString}:${secondsString}`
}
