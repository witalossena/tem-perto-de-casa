"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class LojaSchema extends Schema {
  up() {
    this.create("stores", (table) => {
      table.increments();
      table.string("store_name", 80).notNullable();
      table.string("store_description", 80).notNullable();
      table.string("store_slug", 80).notNullable();
      table.string("store_phone", 80);
      table.string("store_whats", 80).notNullable();
      table.string("store_address", 80).notNullable();
      table.boolean("open_closed").default(true);
      table.boolean("delivery_option").default(true);
      table.float("delivery_fee");
      table.boolean("pickup_in_store");
      table.integer("user_id").unsigned().notNullable();
      table.integer("category_id").unsigned().notNullable();
      table.timestamps();

      table.foreign('user_id').references('id').inTable('users');
      table.foreign('category_id').references('id').inTable('categories');

    });
  }

  down() {
    this.drop("stores");
  }
}

module.exports = LojaSchema;
