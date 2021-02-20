import { FETCH_DATA, FETCH_DATA_SUCCESS, FETCH_DATA_ERROR } from "../constants";

const initialState = {
  loading: false,
  orders: [],
  metrics: [],
  error: "",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...state,
        loading: true,
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        metrics: action.payload.metrics,
        orders: action.payload.orders,
        loading: false,
      };
    case FETCH_DATA_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
