import { type Pack } from '~/server/db/schema'
import { type GameResult } from '.'
import { useEffect, useState } from 'react'
import { Button } from '~/components/ui/button'
import { env } from '~/env'

const DEFAULT_GAME_DURATION = env.NEXT_PUBLIC_ENV === 'development' ? 5 : 60
export function GameInProgress({ pack, onEnd }: { pack: Pack; onEnd: (result: GameResult) => void }) {
    const [currentWordIdx, setCurrentWordIdx] = useState(0)
    const [result, setResult] = useState<boolean[]>([])

    function handleTurn(guessed: boolean) {
        setCurrentWordIdx((prev) => prev + 1)
        setResult([...result, guessed])
    }

    return (
        <div className='flex h-full flex-col items-center justify-center gap-5'>
            <div className='text-5xl'>{pack.words[currentWordIdx]}</div>
            <div className='flex'>
                <Button onClick={() => handleTurn(false)}>Skip</Button>
                <Button onClick={() => handleTurn(true)}>Guessed</Button>
            </div>
            <Timer onTimeout={() => onEnd({ guessedWords: result })} duration={DEFAULT_GAME_DURATION} />
        </div>
    )
}

function Timer({ duration, onTimeout }: { duration: number; onTimeout: () => void }) {
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

    return <div>{timeLeft}</div>
}
