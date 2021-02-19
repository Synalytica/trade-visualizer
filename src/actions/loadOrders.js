// types
import {
  FETCH_ORDERS,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_ERROR,
} from "../constants";

// action objects
const loadOrders = () => (dispatch) => {
  const queryUrl = "../data.json";

  dispatch(fetchOrdersRequest());
  fetch(queryUrl)
    .then((res) => res.json())
    .then((data) => {
      let orderData = data.orders;
      var orders = [];
      var currentOrder = {};
      var tagStringArray;
      for (var i = 0; i < orderData.length; i++) {
        if (i % 2 === 0) {
          currentOrder.id = orderData[i].time * 1000;
          currentOrder["entryTime"] = new Date(orderData[i].time * 1000);
          tagStringArray = orderData[i].text.split("@ ");
          currentOrder["entryPrice"] = parseFloat(tagStringArray[1]);
          if (orderData[i].color === "green") {
            currentOrder["result"] = "W";
          } else if (orderData[i].color === "red") {
            currentOrder["result"] = "L";
          }
          if (orderData[i].shape === "arrowUp") {
            currentOrder["direction"] = "LONG";
          } else if (orderData[i].shape === "arrowDown") {
            currentOrder["direction"] = "SHORT";
          }
        } else {
          currentOrder["exitTime"] = new Date(orderData[i].time * 1000);
          tagStringArray = orderData[i].text.split("@ ");
          currentOrder["exitPrice"] = parseFloat(tagStringArray[1]);
          orders.push(currentOrder);
          currentOrder = {};
        }
      }
      return dispatch(fetchOrdersSuccess(orders));
    })
    .catch((err) => dispatch(fetchOrdersFailure(err)));
};

export const fetchOrdersRequest = () => {
  return {
    type: FETCH_ORDERS,
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: FETCH_ORDERS_SUCCESS,
    payload: orders,
  };
};

export const fetchOrdersFailure = (error) => {
  return {
    type: FETCH_ORDERS_ERROR,
    payload: error,
  };
};

export default loadOrders;
