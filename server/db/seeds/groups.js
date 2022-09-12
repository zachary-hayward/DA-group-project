/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('groups').del()
  await knex('groups').insert([
    {id: 1, name: 'friendChips', image: ''},
    {id: 2, name: 'The fast and the curious', image: ''},
    {id: 3, name: 'Taco bout it', image: ''}
  ]);
};
