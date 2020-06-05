import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
// Components
import Navbar from './Components/Navbar/Navbar.jsx';
import Chips from './Components/Chips/Chips';
import Sardines from './Components/Sardines/Sardines';
import Soda from './Components/Soda/Soda';
import VendingMachine from './Components/VendingMachine/VendingMachine';
// style
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" render={() => <VendingMachine />} />
          <Route exact path="/soda" render={() => <Soda />} />
          <Route exact path="/sardines" render={() => <Sardines />} />
          <Route exact path="/chips" render={() => <Chips />} />
        </Switch>
      </div>
    );
  }
}
