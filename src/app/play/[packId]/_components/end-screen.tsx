import type { Word } from '~/server/db/schema'
import { type GameResult } from '.'
import { Button } from '~/components/ui/button'
import Link from 'next/link'

export function EndScreen({ result, words }: { result: GameResult; words: Word[] }) {
    const guessed = result.guessedWords.filter((hasGuessed) => hasGuessed).length

    return (
        <div className='flex h-full flex-col gap-4 pt-4'>
            <div>
                <h1 className='text-2xl'>
                    Time out! You guessed <span className='text-primary'>{guessed}</span> out of{' '}
                    {result.guessedWords.length} words.
                </h1>
                {result.noMoreWords && <p>{"This shouldn't be humanly possible to go this fast, but you do you."}</p>}
            </div>
            <ul className='flex grow basis-0 flex-col gap-4 overflow-y-auto'>
                {result.guessedWords.map((didGuess, idx) => (
                    <li key={idx} className={didGuess ? 'text-green-500' : 'text-red-500'}>
                        {idx + 1}. {words[idx]!.value}
                    </li>
                ))}
            </ul>
            <div className='flex gap-2'>
                <Button onClick={() => window.location.reload()}>Play again</Button>
                <Button variant='secondary' asChild>
                    <Link href='/'>Change pack</Link>
                </Button>
            </div>
        </div>
    )
}
