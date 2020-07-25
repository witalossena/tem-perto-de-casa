export const ADD_PRODUCT = "ADD_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const DELETE_ALL = "DELETE_ALL";
export const ADD_ADDRESS = "ADD_ADDRESS";
export const ADD_DIALOG = "ADD_DIALOG";
export const USER_LOGIN = "USER_LOGIN";
export const REMOVE_PRODUCT_FROM_DIALOG = "REMOVE_PRODUCT_FROM_DIALOG";

const addProductToCart = (product, state) => {
  // console.log("adding product", product);
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item.id === product.id
  );

  if (updatedItemIndex < 0) {
    updatedCart.push({ ...product, quantity: 1 });
  } else {
    const updatedItem = { ...updatedCart[updatedItemIndex] };
    updatedItem.quantity++;
    updatedCart[updatedItemIndex] = updatedItem;
  }

  return { ...state, cart: updatedCart };
};

const addDialog = (product, state) => {
  // console.log("adding product", product);
  const updatedCart = [...state.cartOptions];
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item.id === product.id
  );

  if (updatedItemIndex < 0) {
    updatedCart.push({ ...product, quantity: 1 });
  } else {
    const updatedItem = { ...updatedCart[updatedItemIndex] };
    updatedItem.quantity++;
    updatedCart[updatedItemIndex] = updatedItem;
  }

  return { ...state, cartOptions: updatedCart };
};

const removeFromDialog = (productId, state) => {
  console.log("remove from dialog", state);
  const updatedCart = [...state.cartOptions];
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item.id === productId
  );
  updatedCart.splice(updatedItemIndex, 1);
  return { ...state, cartOptions: updatedCart };
};

const removeProductFromCart = (productId, state) => {
  console.log("remove product: " + productId);
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item.id === productId
  );
  const updatedItem = {
    ...updatedCart[updatedItemIndex],
  };
  updatedItem.quantity--;
  if (updatedItem.quantity <= 0) {
    updatedCart.splice(updatedItemIndex, 1);
  } else {
    updatedCart[updatedItemIndex] = updatedItem;
  }

  return { ...state, cart: updatedCart };
};

const deleteAll = (productId, state) => {
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item.id === productId
  );
  updatedCart.splice(updatedItemIndex, 1);
  return { ...state, cart: updatedCart };
};

const setTokens = (tokens, state) => {

  const LoggedUser = tokens

  localStorage.setItem('user_data', JSON.stringify(LoggedUser))

  return {...state, user: LoggedUser}
}

export const shopReducer = (state, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return addProductToCart(action.product, state);

    case REMOVE_PRODUCT:
      return removeProductFromCart(action.productId, state);

    case DELETE_ALL:
      return deleteAll(action.productId, state);

    case ADD_DIALOG:
      return addDialog(action.product, state);

    case REMOVE_PRODUCT_FROM_DIALOG:
      return removeFromDialog(action.product, state);

    case USER_LOGIN:
      return setTokens(action.tokens, state) ;  

    default:
      return state;
  }
};
