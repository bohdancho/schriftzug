import { type Pack } from '~/server/db/schema'
import { type GameResult } from '.'
import { Button } from '~/components/ui/button'
import Link from 'next/link'

export function EndScreen({ result, pack }: { result: GameResult; pack: Pack }) {
    const guessed = result.guessedWords.filter((hasGuessed) => hasGuessed).length

    return (
        <div className='flex flex-col items-center'>
            <div className='text-center text-2xl'>
                <h1>
                    Time out! You guessed {guessed} out of {result.guessedWords.length} words.
                    {result.noMoreWords && " This shouldn't be humanly possible to go this fast, but ok."}
                </h1>
            </div>
            <ul className='flex flex-col justify-center gap-5'>
                {result.guessedWords.map((didGuess, idx) => (
                    <li key={idx} className={didGuess ? 'text-green-500' : 'text-red-500'}>
                        {idx + 1}. {pack.words[idx]}
                    </li>
                ))}
            </ul>
            <div className='flex justify-center gap-5'>
                <Button onClick={() => window.location.reload()}>Play again</Button>
                <Button variant='secondary' asChild>
                    <Link href='/'>Change pack</Link>
                </Button>
            </div>
        </div>
    )
}
