require('dotenv').config();
const { expect } = require('chai');
const knex = require('knex');
const { insertItem } = require('../src/shopping-list-service.js');
const ShoppinglistService = require('../src/shopping-list-service.js');

const db = knex({
  client: 'pg',

  connection: process.env.DB_URL_TEST,
});

const newItem = {
  shopping_list_id: 1,
  name: 'Super Awesome Bagel 21+',
  price: '99.00',
  category: 'Breakfast',
  checked: false,
  date_added: new Date('2020-09-24T00:59:27.667Z'),
};

const testList = [
  {
    shopping_list_id: 1,
    name: 'Super Bagel',
    price: '99.00',
    category: 'Breakfast',
    checked: false,
    date_added: new Date('2020-09-24T00:59:27.667Z'),
  },
  {
    shopping_list_id: 2,
    name: 'Super Bagel',
    price: '99.00',
    category: 'Breakfast',
    checked: false,
    date_added: new Date('2020-09-24T00:59:27.667Z'),
  },
  {
    shopping_list_id: 3,
    name: 'Super Bagel',
    price: '99.00',
    category: 'Breakfast',
    checked: false,
    date_added: new Date('2020-09-24T00:59:27.667Z'),
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
      return ShoppinglistService.getAllItems(db).then((res) => {
        expect(res).to.eql([]);
      });
    });
    it('returns correct inserted data from table', () => {
      let validData = [...testList];
      return ShoppinglistService.insertItem(db, validData).then(() => {
        return db.into('shopping_list').then((res) => {
          expect(res).to.eql(validData);
        });
      });
    });
    it('returns correct data when updated', () => {
      let validData = [...testList];
      return ShoppinglistService.insertItem(db, validData).then(() => {
        return ShoppinglistService.updateItem(db, 1, newItem).then((res) => {
          expect(res.name).to.eql(newItem.name);
        });
      });
    });
    it('deletes correct item with delete method', () => {
      let validData = [...testList];
      return ShoppinglistService.insertItem(db, validData).then(() => {
        return ShoppinglistService.deleteItem(db, 1).then(() => {
          return ShoppinglistService.getAllItems(db).then((result) => {
            expect(result).to.have.lengthOf(validData.length - 1);
          });
        });
      });
    });
  });
});
// });
// (`deleteItem() removes an item by id from 'shopping_list' table`, () => {
//     const idToDelete = 3;
//     return ShoppingListService.deleteItem(db, idToDelete)
//       .then(() => ShoppingListService.getAllItems(db))
//       .then(allItems => {
//         // copy the test items array without the removed item
//         const expected = testItems
//           .filter(item => item.id !== idToDelete)
//           .map(item => ({
//             ...item,
//             checked: false,
//           }));
//         expect(allItems).to.eql(expected);
//       });
//   });
