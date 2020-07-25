"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Product extends Model {
  Store() {
    return this.belongsTo("App/Models/Store");
  }

  static get hidden() {
    return ["created_at", "updated_at"];
  }

  // getProductPrice(Product_price) {
  //   var BrlValue = Product_price.toLocaleString("pt-br", { });

  //   return BrlValue;
  // }
}

module.exports = Product;
