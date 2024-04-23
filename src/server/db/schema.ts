import { relations } from 'drizzle-orm'
import { integer, pgTableCreator, serial, varchar } from 'drizzle-orm/pg-core'

export const createTable = pgTableCreator((name) => `schriftzug_${name}`)

export const pack = createTable('pack', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 256 }).notNull(),
})

export const packRelations = relations(pack, ({ many }) => ({
    words: many(word),
}))

export const word = createTable('word', {
    id: serial('id').primaryKey(),
    value: varchar('value', { length: 256 }).notNull(),
    packId: integer('pack_id').references(() => pack.id, { onDelete: 'cascade' }),
})

export const wordRelations = relations(word, ({ one }) => ({
    packs: one(pack, {
        fields: [word.packId],
        references: [pack.id],
    }),
}))

export type Pack = typeof pack.$inferSelect
export type Word = typeof word.$inferSelect
export type PackWithWords = Pack & { words: Word[] }
