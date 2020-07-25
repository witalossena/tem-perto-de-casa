'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProdutoSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table.integer("store_id").unsigned().notNullable();
      table.string("product_name").notNullable();
      table.string("product_description").notNullable();
      table.float("product_price").notNullable();
      table.boolean("sold_out").default(false);
      table.integer("user_id").unsigned().notNullable();
      table.timestamps();

      table.foreign('store_id').references('id').inTable('stores')
      table.foreign('user_id').references('id').inTable('users')

    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProdutoSchema
