// types
import {
  FETCH_METRICS,
  FETCH_METRICS_SUCCESS,
  FETCH_METRICS_ERROR,
} from "../constants";

// action objects
const loadMetrics = () => (dispatch) => {
  const queryUrl = "../data.json";

  dispatch(fetchMetricsRequest());
  fetch(queryUrl)
    .then((res) => res.json())
    .then((data) => {
      return dispatch(fetchMetricsSuccess(data.metrics));
    })
    .catch((err) => dispatch(fetchMetricsFailure(err)));
};

export const fetchMetricsRequest = () => {
  return {
    type: FETCH_METRICS,
  };
};

export const fetchMetricsSuccess = (metrics) => {
  return {
    type: FETCH_METRICS_SUCCESS,
    payload: metrics,
  };
};

export const fetchMetricsFailure = (error) => {
  return {
    type: FETCH_METRICS_ERROR,
    payload: error,
  };
};

export default loadMetrics;
