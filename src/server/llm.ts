import { z } from 'zod'
import { env } from '~/env'
import { GoogleGenerativeAI, SchemaType, type GenerationConfig } from '@google/generative-ai'

export async function generatePackWords(name: string, minLength: number): Promise<string[] | null> {
    console.log(`Generating ${minLength} words for pack "${name}"`)
    const prompt = getGeneratePackWordsPrompt(name, minLength)

    const response = await llmRequest(prompt, (output) => validatePackWords(output, minLength))
    return response?.words ?? null
}

function validatePackWords(words: unknown, minLength: number) {
    const schema = z.object({ words: z.array(z.string()).min(Math.ceil(minLength * 0.8)) })
    const parsed = schema.safeParse(words)
    return parsed.success ? parsed.data : null
}

function getGeneratePackWordsPrompt(name: string, minLength: number) {
    return `You are going to be creating a list of words for a board game. The goal of the game is to explain words one after another to the other players, without using same-root words. Make a list of ${minLength} words with medium explanation difficulty on the following topic: "${name}". Infer the language from the prompt and use it for the list. MAKE SURE TO PRODUCE ${minLength} WORDS`
}

const apiKey = env.GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(apiKey)

const generationConfig: GenerationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: 'application/json',
    responseSchema: {
        type: SchemaType.OBJECT,
        properties: {
            words: {
                type: SchemaType.ARRAY,
                items: {
                    type: SchemaType.STRING,
                },
            },
        },
        required: ['words'],
    },
}
const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash-8b',
    generationConfig,
})

const RETRY_MAX_ATTEMPTS = 3
async function llmRequest<S>(content: string, validate: (input: unknown) => S | null) {
    for (let attempts = 0; attempts < RETRY_MAX_ATTEMPTS; attempts++) {
        const res = await model.generateContent(content).then((res) => JSON.parse(res.response.text()) as unknown)

        const validated = validate(res)
        if (!validated) continue

        return validated
    }
    return null
}
