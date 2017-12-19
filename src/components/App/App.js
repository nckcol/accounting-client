import React, { Component } from 'react';
import './App.css';
import { AccountingTable } from '../AccountingTable/AccountingTable'
import { AccountingStatus } from '../AccountingStatus/AccountingStatus'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Accounting Information System</h1>
        </header>
        <main className="App-content">
          <AccountingStatus/>
          <AccountingTable />
        </main>
      </div>
    );
  }
}

export default App;
