import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Grid from "@material-ui/core/Grid";
import "./App.css";
import Chart from "./components/Chart";
import Orders from "./components/Orders";
import Summary from "./components/Summary";
import loadData from "./actions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <AppBar position="sticky">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Trades Dashboard</Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Chart />
        </Grid>
        <Grid item xs={12} md={4}>
          <Summary />
        </Grid>
        <Grid item xs={12} md={8}>
          <Orders />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
