/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('group_members').del()
  await knex('group_members').insert([
    {id: 1, user_id: 1, group_id: 1},
    {id: 2, user_id: 3, group_id: 1},
    {id: 3, user_id: 2,  group_id: 2},
    {id: 4, user_id: 3,  group_id: 2},
    {id: 5, user_id: 4,  group_id: 2},
    {id: 6, user_id: 1,  group_id: 3},
    {id: 7, user_id: 2,  group_id: 3}
  ]);
};
