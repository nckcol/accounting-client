import React, { Component } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { Loadable } from '../Loadable/Loadable'

import './AccountingStatus.css'

class AccountingStatus extends Component {

  state = {
    loaded: false,
    incomes: [],
    expenses: []
  }

  accountType = {
    1: 'Asset',
    2: 'Liability',
    3: 'Income',
    4: 'Expense',
    5: 'Equity'
  }

  getSummary = (list) => {
    return list.reduce(
      ({debit, credit}, current)=>({
        debit: debit + current.debit,
        credit: credit + current.credit
      })

      , {
      debit: 0,
      credit: 0
    })
  }

  componentDidMount() {
    fetch('http://192.168.0.106:8001/acc/status', {
      method: 'get'
    })
      .then(response => response.json())
      .then(({ incomes, expenses }) => {
        console.log(incomes, expenses)
        this.setState({
          incomes,
          expenses,
          loaded: true
        })
      })
  }

  renderSummary = ({debit, credit}) => {
    return (
      <div className="accountingStatus-summary">
        <div className="accountingStatus-summaryTitle">Summary</div>
        <div className="accountingStatus-summaryDebit">{debit}</div>
        <div className="accountingStatus-summaryCredit">{credit}</div>
      </div>
    )
  }

  renderStatus = () => {
    return [
        <div className="accountingStatus-part">
          <h2 className="accountingStatus-title">Expenses</h2>
          <BootstrapTable data={ this.state.expenses }>
            <TableHeaderColumn dataField='accounting' isKey>Accounting</TableHeaderColumn>
            <TableHeaderColumn dataField='debit' width='120' dataAlign='right'>Debit</TableHeaderColumn>
            <TableHeaderColumn dataField='credit' width='120' dataAlign='right'>Credit</TableHeaderColumn>
          </BootstrapTable>
          {this.renderSummary(this.getSummary(this.state.expenses))}
        </div>,
        <div className="accountingStatus-part">
          <h2 className="accountingStatus-title">Incomes</h2>
          <BootstrapTable data={ this.state.incomes }>
            <TableHeaderColumn dataField='accounting' isKey>Accounting</TableHeaderColumn>
            <TableHeaderColumn dataField='debit' width='120' dataAlign='right'>Debit</TableHeaderColumn>
            <TableHeaderColumn dataField='credit' width='120' dataAlign='right'>Credit</TableHeaderColumn>
          </BootstrapTable>
          {this.renderSummary(this.getSummary(this.state.incomes))}
        </div>
    ]
  }

  render () {
    return (
      <div className='accountingStatus'>
        <Loadable loaded={this.state.loaded} render={() => this.renderStatus()} />
      </div>
    )
  }
}

export {
  AccountingStatus
}