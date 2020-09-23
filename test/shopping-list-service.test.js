require('dotenv').config();
const { expect } = require('chai');
const knex = require('knex');
const { insertItem } = require('../src/shopping-list-service.js');
const ShoppinglistService = require('../src/shopping-list-service.js');

const db = knex({
  client: 'pg',

  connection: process.env.DB_URL_TEST,
});

const testList = [
  {
    shopping_list_id: 1, 
    name: 'Super Bagel',
    price: '99.00',
    category: 'Breakfast',
    checked: false,
    date_added: new Date('2020-09-24T00:59:27.667Z')
  },
  {
    shopping_list_id: 2, 
    name: 'Super Bagel',
    price: '99.00',
    category: 'Breakfast',
    checked: false,
    date_added: new Date('2020-09-24T00:59:27.667Z')
  },
  {
    shopping_list_id: 3, 
    name: 'Super Bagel',
    price: '99.00',
    category: 'Breakfast',
    checked: false,
    date_added: new Date('2020-09-24T00:59:27.667Z')
  },
];

describe('Database test suites', () => {
  describe('All Shopping list CRUD methods are working', () => {
    beforeEach(() => {
      return db.into('shopping_list').truncate();
    });
    afterEach(() => {
      return db.into('shopping_list').truncate();
    });
    after(() => db.destroy());
    it('returns blank array with no data in table', () => {
      return db.into('shopping_list').then((res) => {
        expect(res).to.eql([]);
      });
    });
    it('returns data from table', () => {
      let validData= [...testList];
      return db.into('shopping_list')
        .insert(validData)
        .then(() => {
          return db.into('shopping_list').then((res) => {
            expect(res).to.eql(validData);
          });
        });
    });
  });
});