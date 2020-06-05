import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// Component
import Message from '../Message/Message';

import VendingMachineImg from './VendingMachine.png';
// style
import './VendingMachine.css';

export default class VendingMachine extends Component {
  render() {
    return (
      <div className="vendingMachine" style={{ backgroundImage: `url(${VendingMachineImg})` }}>
        <Message>
          <h1>hello i am a vending machine. what would you like to eat?</h1>
        </Message>
        <Message>
          <h1>
            <Link to="/soda">Soda</Link>
          </h1>
          <h1>
            <Link to="/chips">Chips</Link>
          </h1>
          <h1>
            <Link to="/sardines">Sardines</Link>
          </h1>
        </Message>
      </div>
    );
  }
}
