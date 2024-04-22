import { z } from 'zod'
import { env } from '~/env'

export async function generatePackWords(name: string, minLength: number): Promise<string[] | null> {
    console.log(`Generating ${minLength} words for pack "${name}"`)
    const prompt = getGeneratePackWordsPrompt(name, minLength)

    const response = await llmRequest(prompt, (output) => validatePackWords(output, minLength))
    return response
}

function validatePackWords(outputString: string, minLength: number) {
    const schema = z.array(z.string()).min(minLength)
    const output = outputString.split(',')
    const parsed = schema.safeParse(output)
    return parsed.success ? parsed.data : null
}

function getGeneratePackWordsPrompt(name: string, minLength: number) {
    return `You are going to be creating a list of words for a board game. The goal of the game is to explain words one after another to the other players, without using same-root words. Make a list of ${minLength} words with medium explanation difficulty on the following topic: "${name}". MAKE SURE YOU PRODUCE EXACTLY ${minLength} WORDS. Infer the language from the prompt and use it for the list. Don't write anything but the prompted list, don't preface it with an explanation, no numbers, return just the words divided with commas. ONLY OUTPUT WORDS FOR THE PACK AND COMMAS IN BETWEEN`
}

const RETRY_MAX_ATTEMPTS = 3
type LLMResponse = {
    choices: Array<{ message: { content: string } }>
}
async function llmRequest<S>(content: string, validate: (input: string) => S | null) {
    for (let attempts = 0; attempts < RETRY_MAX_ATTEMPTS; attempts++) {
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

            const outputString = res.choices[0]?.message.content
            if (!outputString) continue

            const output = validate(outputString)
            if (!output) continue

            return output
        } catch (e) {}
    }
    return null
}
