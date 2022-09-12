/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, username: 'paige', full_name: 'Paige Turner', location: 'Auckland', image: ''},
    {id: 2, username: 'ida', full_name: 'Ida Dapizza', location: 'Auckland', image: ''},
    {id: 3, username: 'shaq', full_name: 'Shaquille Oatmeal', location: 'Christchurch', image: ''},
    {id: 4, username: 'chris', full_name: 'Chris P Bacon', location: 'Wellington', image: ''}

  ]);
};
