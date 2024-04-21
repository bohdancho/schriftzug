import { sql } from 'drizzle-orm'
import { pgTableCreator, serial, varchar } from 'drizzle-orm/pg-core'

export const createTable = pgTableCreator((name) => `schriftzug_${name}`)

export const pack = createTable('pack', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 256 }).notNull(),
    imgUrl: varchar('img_url', { length: 256 }).notNull(),
    words: varchar('words', { length: 256 })
        .array()
        .default(sql`'{}'::text[]`) // TODO: remove default value (figure out migrations)
        .notNull(),
})

export type Pack = typeof pack.$inferSelect
