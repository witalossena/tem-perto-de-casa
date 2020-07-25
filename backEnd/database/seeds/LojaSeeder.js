"use strict";

/*
|--------------------------------------------------------------------------
| LojaSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
const Database = use("Database");

const LojaModel = use("App/Models/Store");

class LojaSeeder {
  async run() {

    await Factory.model("App/Models/Store").createMany(15);
  }
}

module.exports = LojaSeeder;









    // await LojaModel.create({
    //   storeName: "restaurante prato fino",
    //   description: "Há mais de 20 anos no mercado",
    //   slug: "restaurante-prato-finoe",
    //   phone: "+5511981734846",
    //   address: "embu",
    // });

    // await LojaModel.create({
    //   storeName: "restaurante providencia",
    //   description: "Há mais de 20 anos no mercado",
    //   slug: "restaurante-providencia",
    //   phone: "+5511981734846",
    //   address: "santos",
    // });

    // await Factory.model("App/Models/Loja").create()