import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "@material-ui/core";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home/Home";
import StableMarriage from "./components/pages/StableMarriage/StableMarriage";
import BasicSimulations from "./components/pages/BasicSimulations/BasicSimulations";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Container maxWidth="xl">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/stable_marriage" component={StableMarriage} />
            <Route
              exact
              path="/basic_simulations"
              component={BasicSimulations}
            />
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;
