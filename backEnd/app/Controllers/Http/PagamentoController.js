"use strict";
const axios = require("axios");
const r = require("xml-js");


class PagamentoController {



  async index({ request, response}) {
    const Env = use("Env");
    const email = Env.get("PagSeguroEmail");
    const token = Env.get("PagsegutoToken");
    const data = request.only(['amount']);

    try {
      const res = await axios.post("https://ws.sandbox.pagseguro.uol.com.br/v2/sessions?email="+email+"&token="+token);

      const StrSession = r.xml2json(res.data, {compact: true,  ignoreDeclaration: true, });
      const StrSessionSplit = StrSession.split('"');
      const SessionID = StrSessionSplit[7];

      const methods = await axios.get("https://ws.sandbox.pagseguro.uol.com.br/payment-methods?amount="+data.amount+"&sessionId="+SessionID, {
        headers: {'Accept': 'application/vnd.pagseguro.com.br.v1+json;charset=ISO-8859-1'}
      });

      return response.send(methods.data)

    } catch (error) {
      return error;
    }
  }

  async paymentMethods({ request, response }) {

  }
}

module.exports = PagamentoController;
