"use strict";

const User = use("App/Models/User");

class AuthController {

  async register({ request, response, auth }) {
    const data = request.only(['email', 'password', 'username']);
    try {
      const user = await User.create(data);

      const accessToken = await auth.generate(user);

      return response
        .status(200)
        .send({status: true, user: user, access_token: accessToken });
    } catch (error) {
      if (error.errno === 1062) {
        return response
        .send({
          status: false,
          message: "email já cadastrado. Tente outro",
        });
      } else {
        return response.send({
          err: error,
          status: false,
          status: "erro desconhecido. Tente novamente",
        });
      }
    }
  }

  async login({ request, auth, response }) {
    const { email, password } = request.all();

    try {
      if (await auth.attempt(email, password)) {
        const user = await User.findBy("email", email);

        const accessToken = await auth.generate(user);

        return response
          .status(200)
          .send({ status: true, user: user, access_token: accessToken });
      }
    } catch (error) {
      return response
      .send(error)
    }
  }
}

module.exports = AuthController;
