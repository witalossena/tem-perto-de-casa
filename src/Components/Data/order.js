import food_image from "./pizza.jpeg";

export default function order(obj, uuid = 0) {
  return {
    order_id: uuid,
    store_id: obj.id,
    store_name: obj.name,
    store_phonenumber: obj.phone,
    store_description: obj.description,
    order_items: [],
    payment_type: "Dinheiro",
    card_brand: "Elo",
    receive_type: "Delivery",
    delivery_fee: 54,
    client_info: {
      name: "cliente 1",
      address: "Rua teste, nº 4884",
      nbhd: "Bairro 01",
      city: "São Paulo",
      state: "SP",
      phone_number: "11 995465486",
    },
  };
}
