require('dotenv').config();
const { expect } = require('chai');
const knex = require('knex');

const db = knex({
  client: 'pg',

  connection: process.env.DB_URL_TEST,
});

const testList = [
  {
    name: 'Super Bagel',
    price: 99,
    category: 'Breakfast',
  },
  {
    name: 'Bagel',
    price: 2,
    category: 'Breakfast',
  },
  {
    name: 'Awful Bagel',
    price: 0.01,
    category: 'Breakfast',
  },
];

describe('Database test suites', () => {
  describe('All Shopping list CRUD methods are working', () => {
    beforeEach(() => {
      db.truncate();
    });
    after(() => db.destroy());
    it('returns blank array with no data in table', () => {
      return db
        .into('shopping_list')
        .insert()
        .expect(() => {
          expect();
        });
    });
  });
});
