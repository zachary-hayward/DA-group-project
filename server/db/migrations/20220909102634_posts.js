/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable('posts', (table) => {
    table.increments('id')
    table.integer('user_id')
    table.text('body')
    table.text('image')
    table.timestamp('created_at')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTable('posts')
}
