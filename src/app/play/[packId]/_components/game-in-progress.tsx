import type { Word } from '~/server/db/schema'
import { type GameResult } from '.'
import { useEffect, useState } from 'react'
import { Button } from '~/components/ui/button'

export function GameInProgress({
    words,
    durationSec,
    onEnd,
}: {
    words: Word[]
    durationSec: number
    onEnd: (result: GameResult) => void
}) {
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
        <div className='relative h-full'>
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
                    durationSec={durationSec}
                    className='pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 font-mono text-5xl'
                />
            </div>
        </div>
    )
}

function Timer({
    durationSec,
    onTimeout,
    className,
}: {
    durationSec: number
    onTimeout: () => void
    className?: string
}) {
    const [timeLeftMs, setTimeLeftMs] = useState(durationSec * 1000)

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeftMs((prev) => prev - 50)
        }, 50)

        if (timeLeftMs <= 0) {
            clearInterval(interval)
            onTimeout()
        }

        return () => clearInterval(interval)
    }, [timeLeftMs, onTimeout])

    return <div className={className}>{formatTime(timeLeftMs)}</div>
}

function formatTime(time: number) {
    const minutes = Math.floor(time / 60_000)
    const seconds = Math.floor((time % 60_000) / 1000)

    const minutesString = minutes.toString().padStart(2, '0')
    const secondsString = seconds.toString().padStart(2, '0')

    return `${minutesString}:${secondsString}`
}
