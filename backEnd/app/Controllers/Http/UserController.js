"use strict";

const User = use("App/Models/User");

class UserController {
  async index({ request, response }) {}

  async store({ request, auth, response }) {}




  async getUserStore({ request, response }) {
    try {
      const data = request.all();
      const userId = data.user_id
      const user = await User.findBy("id", userId);
      const lojas = await user.Store().fetch();



      return response.send(lojas);
    } catch (error) {
      return response.send({ error });
    }
  }

  async getUserProducts({ request, response} ){
    try {
      const data = request.all()  

      const email = data.user.email

      const user = await User.findBy('email', email)
      const products = await user.Products().fetch()
      const lojas = await user.Store().fetch()

      return response.send({lojas, products})

    } catch (error) {
      
    }

  }




}

module.exports = UserController;
