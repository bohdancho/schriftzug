import { type Pack } from '~/server/db/schema'
import { type GameResult } from '.'

export function GameInProgress({ pack, onEnd }: { pack: Pack; onEnd: (result: GameResult) => void }) {
    return (
        <>
            {pack.words?.map((word) => <div key={word}>{word}</div>)}
            <button onClick={onEnd}>End Game</button>
        </>
    )
}
