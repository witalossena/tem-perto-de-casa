"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Store extends Model {
  Product() {
    return this.hasMany("App/Models/Product");
  }

  User() {
    return this.belongsTo("App/Models/User");
  }

  Category() {
    return this.belongsTo("App/Models/Category");
  }

  static get hidden() {
    return ["created_at", "updated_at"];
  }

  static boot() {
    super.boot();
  }

  // getDeliveryFee(delivery_fee) {
  //   var BrlValue = delivery_fee.toLocaleString("pt-br");

  //   return BrlValue;
  // }

  setStoreSlug(store_slug) {
    var re = new RegExp('\\s', 'g');
    return store_slug.replace(re, "-").toLowerCase();
  }
}

module.exports = Store;
