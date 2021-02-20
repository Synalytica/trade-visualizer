import { FETCH_DATA, FETCH_DATA_SUCCESS, FETCH_DATA_ERROR } from "../constants";

// action objects
const loadData = () => (dispatch) => {
  const queryUrl = "../data.json";

  dispatch(fetchDataRequest());
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
      const dataObj = { metrics: data.metrics, orders: orders };
      return dispatch(fetchDataSuccess(dataObj));
    })
    .catch((err) => dispatch(fetchDataFailure(err)));
};

export const fetchDataRequest = () => {
  return {
    type: FETCH_DATA,
  };
};

export const fetchDataSuccess = (data) => {
  return {
    type: FETCH_DATA_SUCCESS,
    payload: data,
  };
};

export const fetchDataFailure = (error) => {
  return {
    type: FETCH_DATA_ERROR,
    payload: error,
  };
};

export default loadData;
