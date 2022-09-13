/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('posts').del()
  await knex('posts').insert([
    {id: 1, auth0_id: 'auth0|123', body: 'I found this really interesting book, you should check it out', image: '', created_at: new Date(Date.now())},
    {id: 2, auth0_id: 'auth0|234', body: 'I found this really cool Italian place, they have the best food', image: '', created_at: new Date(Date.now())},
    {id: 3, auth0_id: 'auth0|234', body: 'No pineapples', image: '', created_at: new Date(Date.now())},
    {id: 4, auth0_id: 'auth0|456', body: 'I love a full English breakfast', image: '', created_at: new Date(Date.now())}
  ]);
};
