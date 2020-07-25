"use strict";

const Store = use("App/Models/Store");

class LojaController {
  async GetAllStore({ request, response }) {
    try {
      const store = await Store.all();
      return response.send(store);
    } catch (error) {
      return response.send(error);
    }
  }

  async GetLojaByName({ request, response }) {
    const slug = request.params.slug;
    try {
      const store = await Store.findBy('store_slug', slug);

      if (!store) {
        return response.send({ error: "erro" });
      }
      const products = await store.Product().fetch();
      return response.send({ store, products });
    } catch (error) {
      return response.send(error);
    }
  }

  async Store({ request, response }) {

    try {
      const data = request.except(["token"]);
      const store = await Store.create(data);
      return response.send(store);
    } catch (error) {
      return response.send(error);
    }
  }

  async UpdateStore({ request, response, params }) {
    const data = request.all();

    const loja = await Store.findOrFail(data.id);

    loja.merge(data);
    await loja.save();

    return response.send({ loja, status: true });
  }

  async LojaProducts({ request, response }) {
    const data = request.all();
    const id = data.user.id

    try {
      const store = await Store.find(id)
      const products = await store.products().fetch();
      console.log(products)

      return response.send(products)
       
    } catch (error) {}
  }
}

module.exports = LojaController;
