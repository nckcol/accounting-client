import React, { Component } from 'react'
import { Loadable } from '../Loadable/Loadable'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { HOST, PORT } from '../../config/index'

class ProductList extends Component {

  state = {
    loaded: false,
    products: []
  }

  componentDidMount() {
    fetch(`http://${HOST}:${PORT}/products`, {
      method: 'get'
    })
      .then(response => response.json())
      .then(({ products }) => {
        this.setState({
          products,
          loaded: true
        })
      })
  }

  onRowSelect = (selected, row) => {
    this.state(({selectedProducts}) => {

      if (!selected) {
        selectedProducts = selectedProducts.filter(item => item !== row)
      }

      if (selectedProducts.indexOf(row) === -1) {
        selectedProducts.push(row)
      }

      return {
        selectedProducts
      }
    })
  }

  renderContent = () => {
    return (
      <BootstrapTable data={ this.state.products } selectRow={ { mode: 'checkboxes' } }
                      options={{
                        onSelect: this.onRowSelect,
                      }}>
        <TableHeaderColumn dataField='id' width='80' isKey>#</TableHeaderColumn>
        <TableHeaderColumn dataField='title'>Title</TableHeaderColumn>
        <TableHeaderColumn dataField='vendor'>Vendor</TableHeaderColumn>
        <TableHeaderColumn dataField='quantity' width='120' dataAlign='right'>Quantity</TableHeaderColumn>
        <TableHeaderColumn dataField='price' width='120' dataAlign='right'>Price</TableHeaderColumn>
      </BootstrapTable>
    )
  }

  render () {
    return (
      <div className='productList'>
        <Loadable loaded={this.state.loaded} render={() => this.renderContent()} />
      </div>
    )
  }
}

export {
  ProductList
}