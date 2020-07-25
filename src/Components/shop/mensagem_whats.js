export default function sendWhatsAppMessage(obj) {
  const nossaURL = `SITE DA NOSSA PLATAFORMA`;

  console.log(obj)


  Number.prototype.toBRL = function () {
    const n = 2; //Número de casas decimais
    const x = 3; //Tamanho dos inteiros
    const c = ","; //Separador decimal
    const s = "."; //Agrupador

    var re = "\\d(?=(\\d{" + (x || 3) + "})+" + (n > 0 ? "\\D" : "$") + ")",
      num = this.toFixed(Math.max(0, ~~n));

    return (
      "R$ " +
      (c ? num.replace(".", ",") : num).replace(
        new RegExp(re, "g"),
        "$&" + (s || ",")
      )
    );
  }; //https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string

  const pedidos = obj.order_items.map((item, index) => {
    const lb = "---------------------------------------";
    const total = parseFloat(item.product_price) * item.quantity;
    console.log(item.product_price)
    return (
      // `*Item #${index + 1}* - ${item.quantity} x ${item.name}  ${item.price.toBRL()} ` + `\n*observações*: ${item.observations}` + `\n_Subtotal: ${total.toBRL()}_\n${lb}`
      `*Item ${index + 1}* - ${item.quantity} x ${item.product_name} \n*preço unitário*: ${parseFloat(item.product_price).toBRL()}` + `\n*oservações*: ${item.observations}` + `\n\n*subtotal*: ${total.toBRL()} \n${lb}`

    );
  });

  let total_ordem = 0;
  obj.order_items.map(function (item) {
    total_ordem += parseFloat(item.product_price) * item.quantity;
  });

  const info_cliente =
    `*Nome:* ${obj.client_info.name}\n` +
    `${
      !obj.client_info.address ? "" : `*Endereço:* ${obj.client_info.address}\n`
    }` +
    // `*Bairro:* ${order.client_info.nbhd}\n` +
    `*Telefone:* ${obj.client_info.phone_number}`;

  const info_entrega = `*Tipo de entrega:* ${
    obj.delivery.delivery_type === "delivery"? `retirada em loja` : `delivery\n*Taxa de entrega:* ${obj.delivery.delivery_fee.toBRL()}` }`;

  const info_pagamento =
    `*Pedido pago ${
      obj.payment.payment_type === "cartão"
        ? `com:* ${obj.payment.payment_type.toLowerCase()} 💳` +
          `\n*Bandeira:* ${obj.card_brand}`
        : obj.payment.payment_type === "Dinheiro"
        ? `em:* dinheiro 💵`
        : `com:* ${obj.payment.payment_type}`
    }` +
    `\n*Troco para:* ${
      obj.payment.change
        ? "R$" + obj.payment.change
        : "O cliente não precisa de troco"
    }` +
    `\n*Total do pedido:* ${(obj.delivery.delivery_fee + total_ordem).toBRL()}`;

  const nl = "\n\n";
  const lb = "---------------------------------------";
  let message = `Obrigado por comprar com a *${obj.store.store_name}*`;
  message += `${nl}*⬇️Itens⬇️* ${nl}${pedidos.join("\n")}`;
  message += `\n*Subtotal do pedido:* ${total_ordem.toBRL()}`;
  // message += `\n*Observações:* ${obj.delivery.observation}`;
  message += `${nl}*⬇️Informações do cliente⬇️* ${nl}${info_cliente}`;
  message += `${nl}*⬇️Informações de entrega⬇️* ${nl}${info_entrega}`;
  message += `${nl}*⬇️Informações de pagamento⬇️* ${nl}${info_pagamento}`;
  message += `${nl}Pedido nº_${obj.order_id}_realizado_via_ * Tem_Perto_de_Casa *_ ©✅`;

  if (window.innerWidth <= 576) {
    return encodeURI( `https://api.whatsapp.com/send?phone=${obj.store.store_phonenumber}&text=${message}`)
    
  }

  return encodeURI(
    `https://web.whatsapp.com/send?phone=${obj.store.store_phonenumber}&text=${message}`
  );
}
