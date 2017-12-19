import React, { Component } from 'react';
import './App.css';
import { AccountingTable } from '../AccountingTable/AccountingTable'
import { AccountingStatus } from '../AccountingStatus/AccountingStatus'
import { Route, Link } from 'react-router-dom'
import { ProductList } from '../ProductList/ProductList'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Accounting Information System</h1>
          <nav className="App-nav">
            <Link to="/products" className="App-link">Products</Link>
            <Link to="/order" className="App-link">Order</Link>
            <Link to="/account" className="App-link">Account</Link>
          </nav>
        </header>
        <Route exact path='/' render={ props => {
          return (
            <main className="App-content">
              <h1>Welcome!</h1>
            </main>
          )
        }} />

        <Route exact path='/products' render={ props => {
          return (
            <main className="App-content">
              <h1>Product List</h1>
              <ProductList />
            </main>
          )
        }} />

        <Route path='/order' render={ props => {
          return (
            <main className="App-content">
              <h1>Order List</h1>
            </main>
          )
        }} />

        <Route path='/account' render={ props => {
          return (
            <main className="App-content">
              <h1>Account</h1>
              <AccountingStatus/>
              <AccountingTable />
            </main>
          )
        }} />
      </div>
    );
  }
}

export default App;
