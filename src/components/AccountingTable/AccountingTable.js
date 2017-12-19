import React, { Component } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { Loadable } from '../Loadable/Loadable'
import { HOST, PORT } from '../../config'

class AccountingTable extends Component {

  state = {
    loaded: false,
    accounting: []
  }

  accountType = {
    1: 'Asset',
    2: 'Liability',
    3: 'Income',
    4: 'Expense',
    5: 'Equity'
  }

  transformAccounting = (accounting) => {
    return accounting.map((item) => {
      item.type = item.accounting_type.id
      return item
    })
  }

  customAccountTypeField = (column, attr, editorClass, ignoreEditable) => {
    return (
      <select className={ `${editorClass}` } { ...attr }>
        {
          Object.keys(this.accountType)
            .map(key => (<option key={ key } value={ key }>{ this.accountType[key] }</option>))
        }
      </select>
    );
  }

  onAfterInsertRow = (row) => {

  }

  onAfterDeleteRow = (rows) => {

  }

  componentDidMount() {
    fetch(`http://${HOST}:${PORT}/acc`, {
      method: 'get'
    })
      .then(response => response.json())
      .then(({ accounting }) => ({ accounting: this.transformAccounting(accounting) }))
      .then(({ accounting }) => {
        this.setState({
          accounting,
          loaded: true
        })
      })
  }

  renderTable = () => {
    return (
      <BootstrapTable
        data={ this.state.accounting }
        exportCSV={ true }
        insertRow={ true }
        deleteRow={ true }
        search={ true }
        selectRow={ {mode: 'checkbox'} }
        options={{
          afterInsertRow: this.onAfterInsertRow,
          afterDeleteRow: this.onAfterDeleteRow,
          clearSearch: true
        }}
      >
        <TableHeaderColumn row='0' rowSpan='2'
          dataField={'id'}
          isKey
          width='80px'
          dataAlign='right'
          hiddenOnInsert autoValue
        >#</TableHeaderColumn>
        <TableHeaderColumn row='0' rowSpan='2'
          dataField={'type'}
          filterFormatted
          dataFormat={ (cell, row, enumerated) => {
            return enumerated[cell]
          }}
          formatExtraData={ this.accountType }
          customInsertEditor={ { getElement: this.customAccountTypeField } }
          filter={{ type: 'SelectFilter', options: this.accountType }}
        >Accounting Type</TableHeaderColumn>
        <TableHeaderColumn row='0' rowSpan='2' dataField={'accounting'}>Description</TableHeaderColumn>
        <TableHeaderColumn row='0' colSpan='2'>Changes</TableHeaderColumn>
        <TableHeaderColumn row='1' dataField={'debit'} width='120px' dataAlign='right'>Debit</TableHeaderColumn>
        <TableHeaderColumn row='1' dataField={'credit'} width='120px' dataAlign='right'>Credit</TableHeaderColumn>
      </BootstrapTable>
    )
  }

  render () {
    return (
      <div className={'accountingTable'}>
        <Loadable loaded={this.state.loaded} render={() => this.renderTable()} />
      </div>
    )
  }
}

export {
  AccountingTable
}