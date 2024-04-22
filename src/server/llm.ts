import { type ZodSchema, z } from 'zod'
import { env } from '~/env'

export async function generatePackWords(name: string, length: number) {
    console.log(`Generating ${length} words for pack "${name}"`)
    const prompt = getGeneratePackWordsPrompt(name, length)
    const schema = z.array(z.string()).length(length)
    return llmRequest(prompt, schema)
}

function getGeneratePackWordsPrompt(name: string, amount: number) {
    return `You are going to be creating a list of words for a board game. The goal of the game is to explain words one after another to the other players, without using same-root words. Make a list of ${amount} words or word groups (no longer than 3 words) with medium explanation difficulty on the following topic: "${name}". Infer the language from the prompt and use it for the list. Don't write anything but the prompted list, don't preface it with an explanation, no numbers, return a JSON array.`
}

const RETRY_MAX_ATTEMPTS = 3
type LLMResponse = {
    choices: Array<{ message: { content: string } }>
}
async function llmRequest<S>(content: string, schema: ZodSchema<S>) {
    let attempts = 0
    do {
        try {
            const res = await fetch('https://api.awanllm.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${env.LLM_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'Meta-Llama-3-8B-Instruct',
                    messages: [{ role: 'user', content }],
                }),
            }).then((res) => res.json() as Promise<LLMResponse>)
            const outputString = res.choices[0]!.message.content
            const outputUntyped = JSON.parse(outputString) as unknown
            const output = schema.parse(outputUntyped)
            return output
        } catch (e) {
            attempts++
        }
    } while (attempts < RETRY_MAX_ATTEMPTS)
    return null
}
