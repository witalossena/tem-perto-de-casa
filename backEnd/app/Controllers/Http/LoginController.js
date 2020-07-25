"use strict";

const User = use("App/models/User");

class LoginController {

  async login({ request, response }) {
    try {
      const data = request.only(["email", "password"]);

      const token = await auth.attempt(uid, data.password)

      return data.password

    } catch (error) {
        return response.status(error.status).send(error);
    }
  }

}

module.exports = LoginController;
