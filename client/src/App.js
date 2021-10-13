import React, { Component } from "react";
import DashboardT from "./DashboardT";
import DashboardR from "./DashboardR";
import NavBar from "./components/navbar";
import { Switch, Route, Redirect } from "react-router-dom";
class App extends Component {
  state = {};
  render() {
    return (
      <div>
        <NavBar />
        <main>
          <Switch>
            <Route path="/Topic" component={DashboardT} />
            <Route path="/Relation" component={DashboardR} />
            <Redirect from="/" exact to="/Topic" />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
