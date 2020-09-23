require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',

  connection: process.env.DB_URL,
});

// const newShoppingItem = {
//   name: 'Super Bagel',
//   price: 99,
//   category: 'Breakfast',
// };

const ShoppinglistService = {
  getAllItems(knex) {
    return knex
      .select('*')
      .from('shopping_list')
      .then((res) => console.log(res))
      .then(() => knex.destroy());
  },
  insertItem(knex) {
    return knex
      .insert({ name: 'bagel', price: 2.0, category: 'Breakfast' })
      .from('shopping_list')
      .then((res) => console.log(res))
      .then(() => knex.destroy());
  },
  updateItem(knex, id, newShoppingItem) {
    return knex
      .from('shopping_list')
      .where({ shopping_list_id: id })
      .update(newShoppingItem)
      .then((res) => console.log(res))
      .then(() => knex.destroy());
  },
  deleteItem(knex, id) {
    return knex
      .from('shopping_list')
      .where({ shopping_list_id: id })
      .delete()
      .then((res) => console.log(res))
      .then(() => knex.destroy());
  },
};

//ShoppinglistService.getAllItems(knexInstance);

//('Mascarphony', 1.80, 'Lunch', true,   now() - '7 days'::INTERVAL)

//ShoppinglistService.insertItem(knexInstance);

//ShoppinglistService.updateItem(knexInstance, 33, newShoppingItem);

//ShoppinglistService.deleteItem(knexInstance, 33);
module.exports = ShoppinglistService;
