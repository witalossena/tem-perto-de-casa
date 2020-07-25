'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/Loja', (faker) => {
  return {
    store_name: faker.company(),
    store_description: faker.sentence({ words: 5}),
    store_slug: faker.word(),
    store_phone: faker.phone(),
    store_address: faker.address()
  }
})

