export const FETCHED_STORE = "FETCHED_STORE";

const handleStore = (state, storeData) => {
  return { ...state, store: storeData };
};

export const storeReducer = (state, action) => {
  switch (action.type) {
    case FETCHED_STORE:
      return handleStore(state, action.storeData);
    default:
      return state;
  }
};
