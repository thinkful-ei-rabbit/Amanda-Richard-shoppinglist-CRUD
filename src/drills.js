require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
});

const string = 'seitan';
const pageNumber = 1;
const daysAgo = '11 days';

function searchTerm(search) {
  return knexInstance('shopping_list')
    .select('*')
    .where('name', 'ilike', `%${search}%`)
    .then(results => {
        console.log(results)
        knexInstance.destroy();
    })
    
}

//searchTerm(string);

function pagination(pageNumber) {
    let offset = (pageNumber - 1) * 6;

    return knexInstance('shopping_list')
    .limit(6)
    .offset(offset)
    .then(result => {
        console.log(result)
        knexInstance.destroy();
    })
}

//pagination(pageNumber);

function findTime(daysAgo) {
    return knexInstance('shopping_list')
    .select('*')
    .where('date_added', '>', knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo))
    .then(result => {
        console.log(result)
        knexInstance.destroy();
    })
}

//findTime(daysAgo)

function totals() {
    return knexInstance('shopping_list')
    .select('category')
    .sum('price')
    .groupBy('category')
    .then(result => {
        console.log(result)
        knexInstance.destroy();
    })
}

//totals()