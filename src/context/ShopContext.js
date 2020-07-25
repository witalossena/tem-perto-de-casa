import React from "react";

export default React.createContext({
  cart: [],
  localEntrega: {},
  cartOptions: [],
  user: {},
  adminArea: false,
  store: [],
  addProductToCart: (product) => {},
  removeProductFromCart: (productId) => {},
  deleteAll: (productId) => {},
  teste: () => {},
  addEndereco: (newValue) => {},
  addDialog: (product)  => {},
  removeFromDialog: (productId) => {},
  Handleloading: () => {},
  setTokens: (tokens) => {},  
  setAdminArea: () => {},
  handleStore: (storeData) => {}
});
