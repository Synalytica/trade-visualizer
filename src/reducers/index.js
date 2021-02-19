import { combineReducers } from "redux";
import metricsReducer from "./metricsReducer";
import ordersReducer from "./ordersReducer";

const rootReducer = combineReducers({
  metrics: metricsReducer,
  orders: ordersReducer,
});

export default rootReducer;
