import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Accordion from '@material-ui/core/Accordion';
import Container from '@material-ui/core/Container';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import TrendingDownIcon from "@material-ui/icons/TrendingDown";

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

  return <>
    <h2>{loading ? 'Loading...' : error ? error : 'Statistics'}</h2>
    {loading ? "Please wait for statistics to be loaded!"
      : metrics.map(metric =>
        <Accordion key={metric.metric}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <h4>
              {metric.metric} &nbsp;
              <Chip
                label={metric.overall}
              />
            </h4>
          </AccordionSummary>
          <AccordionDetails>
            <Container maxWidth="sm">
              <h4><TrendingUpIcon /> Long</h4>
              <p>
                {metric.long}
              </p>
              <Divider variant="middle" />
              <h4><TrendingDownIcon /> Short</h4>
              <p>
                {metric.short}
              </p>
            </Container>
          </AccordionDetails>
        </Accordion>)
    }
  </>;
};

export default Summary;
