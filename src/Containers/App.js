import React from "react";
import "./App.css";
import Orders from "../Components/Orders";
import Chart from "../Components/Chart";
import Summary from "../Components/Summary";

function App() {
  return (
    <div className="App">
      <Summary />
      <Chart />
      <Orders />
    </div>
  );
}

export default App;
