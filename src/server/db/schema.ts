import { relations } from 'drizzle-orm'
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const pack = sqliteTable('pack', {
    id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    name: text('name', { length: 256 }).notNull(),
})

export const packRelations = relations(pack, ({ many }) => ({
    words: many(word),
}))

export const word = sqliteTable('word', {
    id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    value: text('value', { length: 256 }).notNull(),
    packId: int('pack_id').references(() => pack.id, { onDelete: 'cascade' }),
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
