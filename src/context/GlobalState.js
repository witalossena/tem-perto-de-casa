import React, { useReducer, useState } from "react";

import ShopContext from "./ShopContext";

import {
  shopReducer,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  DELETE_ALL,
  ADD_DIALOG,
  REMOVE_PRODUCT_FROM_DIALOG,
  USER_LOGIN,
} from "./reducer";

import { ADD_ADDRESS, placeReducer } from "./placereducer";

import { FETCHED_STORE, storeReducer } from "./store.reducer";

function GlobalState({ children }) {
  const [cartState, dispatch] = useReducer(shopReducer, { cart: [] });
  const [cartOptionsState, dispatchThree] = useReducer(shopReducer, {
    cartOptions: [],
  });
  const [enderecoState, dispatchTwo] = useReducer(placeReducer);
  const [userState, dispatchAuth] = useReducer(shopReducer, { user: {} });

  const [storeState, dispatchStore] = useReducer(storeReducer, { store: [] });

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [adminArea, setAdmin] = useState(false);

  const addProductToCart = (product, obs) => {
    dispatch({ type: ADD_PRODUCT, product: product });
  };

  const addDialog = (product) => {
    dispatchThree({ type: ADD_DIALOG, product: product });
  };

  const removeFromDialog = (productId) => {
    dispatchThree({ type: REMOVE_PRODUCT_FROM_DIALOG, productId: productId });
  };

  const removeProductFromCart = (productId) => {
    dispatch({ type: REMOVE_PRODUCT, productId: productId });
  };

  const deleteAll = (productId) => {
    dispatch({ type: DELETE_ALL, productId: productId });
  };

  const teste = () => {
    setOpen(true);
  };

  const addEndereco = (place) => {
    dispatchTwo({ type: ADD_ADDRESS, place: place });
  };

  const setTokens = (tokens) => {
    dispatchAuth({ type: USER_LOGIN, tokens: tokens });
  };

  const setAdminArea = () => {
    setAdmin(true);
  };

  const handleStore = (storeData) => {
      dispatchStore({ type: FETCHED_STORE, storeData: storeData });
  };

  return (
    <ShopContext.Provider
      value={{
        open,
        setOpen,
        cart: cartState.cart,
        cartOptions: cartOptionsState.cartOptions,
        localEntrega: enderecoState,
        user: userState.user,
        store: storeState.store,
        addProductToCart: addProductToCart,
        removeProductFromCart: removeProductFromCart,
        deleteAll: deleteAll,
        teste: teste,
        addEndereco: addEndereco,
        addDialog: addDialog,
        removeFromDialog: removeFromDialog,
        loading,
        setLoading,
        setTokens: setTokens,
        setAdminArea: setAdminArea,
        adminArea,
        handleStore: handleStore,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export default GlobalState;
