"use strict";

const Category = use("App/Models/Category");

class CategoryController {
  async index({ request, response }) {
    const categories = await Category.all();

    return response.send(categories);
  }

  async getCategoryStore({ request, response }) {
    const cat = request.params.cat;

    const category = await Category.findBy("category_name", cat);

    const store = await category.Store().fetch()

    return response.send({category, store});
  }
}

module.exports = CategoryController;
