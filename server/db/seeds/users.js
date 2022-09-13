/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, auth0_id: 'auth0|123', username: 'paige', full_name: 'Paige Turner', location: 'Auckland', image: ''},
    {id: 2, auth0_id: 'auth0|234', username: 'ida', full_name: 'Ida Dapizza', location: 'Auckland', image: ''},
    {id: 3, auth0_id: 'auth0|345', username: 'shaq', full_name: 'Shaquille Oatmeal', location: 'Christchurch', image: ''},
    {id: 4, auth0_id: 'auth0|456', username: 'chris', full_name: 'Chris P Bacon', location: 'Wellington', image: ''}

  ]);
};
