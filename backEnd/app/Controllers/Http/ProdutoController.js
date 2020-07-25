"use strict";

const Products = use("App/Models/Product");

class ProdutoController {
  async store({ request, response }) {
    const data = request.all()

    const product = await Products.create(data);

    return response.send(product);
  }
}

module.exports = ProdutoController;
