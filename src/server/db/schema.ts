import { pgTableCreator, serial, varchar } from 'drizzle-orm/pg-core'

export const createTable = pgTableCreator((name) => `schriftzug_${name}`)

export const pack = createTable('pack', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 256 }),
    imgUrl: varchar('img_url', { length: 256 }),
})
