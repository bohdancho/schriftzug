'use client'

import { useState } from 'react'
import { StartScreen } from './start-screen'
import { GameInProgress } from './game-in-progress'
import { EndScreen } from './end-screen'
import type { Pack, Word } from '~/server/db/schema'

export function Game({ words }: { pack: Pack; words: Word[] }) {
    const [game, setGameState] = useState<GameState>({ step: 'start-screen', result: null })

    function handleGameStart() {
        setGameState({ step: 'game-in-progress', result: null })
    }
    function handleGameEnd(result: GameResult) {
        setGameState({ step: 'end-screen', result })
    }

    if (game.step === 'start-screen') return <StartScreen onStart={handleGameStart} />
    if (game.step === 'game-in-progress') return <GameInProgress words={words} onEnd={handleGameEnd} />
    if (game.step === 'end-screen') return <EndScreen words={words} result={game.result} />
}

type GameState = GameStateStart | GameStateGame | GameStateEnd
type GameStateStart = {
    step: 'start-screen'
    result: null
}
type GameStateGame = {
    step: 'game-in-progress'
    result: null
}
type GameStateEnd = {
    step: 'end-screen'
    result: GameResult
}
export type GameResult = { guessedWords: boolean[]; noMoreWords?: boolean }
