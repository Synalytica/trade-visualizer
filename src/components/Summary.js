import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import loadMetrics from "../actions/loadMetrics";

const Summary = () => {
  const loading = useSelector((state) => state.metrics.loading);
  const error = useSelector((state) => state.metrics.error);
  const metrics = useSelector((state) => state.metrics.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadMetrics());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(metrics);

  return loading ? (
    <h2>Loading...</h2>
  ) : error ? (
    <h2>{error}</h2>
  ) : (
    <div>
      <h2>Useful Statistics</h2>
      <div>{metrics["overall"]}</div>
    </div>
  );
};

export default Summary;
