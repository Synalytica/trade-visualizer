// types
import {
  FETCH_METRICS,
  FETCH_METRICS_SUCCESS,
  FETCH_METRICS_ERROR,
} from "../constants";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const metricsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_METRICS:
      return {
        ...state,
        loading: true,
      };
    case FETCH_METRICS_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: "",
      };
    case FETCH_METRICS_ERROR:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default metricsReducer;
