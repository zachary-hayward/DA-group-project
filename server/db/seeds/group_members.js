/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('group_members').del()
  await knex('group_members').insert([
    {id: 1, auth0_id: 'auth0|123', group_id: 1},
    {id: 2, auth0_id: 'auth0|345', group_id: 1},
    {id: 3, auth0_id: 'auth0|234',  group_id: 2},
    {id: 4, auth0_id: 'auth0|345',  group_id: 2},
    {id: 5, auth0_id: 'auth0|456',  group_id: 2},
    {id: 6, auth0_id: 'auth0|123',  group_id: 3},
    {id: 7, auth0_id: 'auth0|234',  group_id: 3}
  ]);
};
