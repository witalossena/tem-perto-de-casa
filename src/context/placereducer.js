export const ADD_ADDRESS = "ADD_ADDRESS";

const addEndereco = (endereco, state) => {
  const c = state;
  if (c === null) {
    return state;
  } else {
    return state.description;
  }
};

export const placeReducer = (state, action) => {
  switch (action.type) {
    case ADD_ADDRESS:
      return addEndereco(state, action.place);
    default:
      return state;
  }
};
