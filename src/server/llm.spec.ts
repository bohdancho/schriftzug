import { expect, test } from 'bun:test'
import { generatePackWords } from './llm'

test('generate pack about League of Legends', async () => {
    const result = await generatePackWords('league of legends', 100)
    expect(result).toSatisfy((arr) => !!arr && arr.length >= 80)
})

test('generate pack in German', async () => {
    const result = await generatePackWords('еміграція в Німеччину', 100)
    expect(result).toSatisfy((arr) => !!arr && arr.length >= 80)
})

test('generate pack in Ukrainian', async () => {
    const result = await generatePackWords('Duales Studium ist anstrengend', 100)
    expect(result).toSatisfy((arr) => !!arr && arr.length >= 80)
})
