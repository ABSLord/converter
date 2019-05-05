import React, {Component} from 'react';
import {Dropdown, DropdownButton, Table} from "react-bootstrap";
import axios from 'axios';
import './dropdown.css'

class RatesList extends Component {
  state = {
    rates: [],
    base: ''
  }

  chooseCurrency = (rate, evt) => {
    evt.preventDefault();
    axios.get(`https://api.exchangeratesapi.io/latest`, {
      params: {
        base: rate
      }
    })
      .then(res => {
        const rates = res.data.rates;
        this.setState({base: rate});
        this.setState({rates: Object.entries(rates)});
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentDidMount() {
    const baseDefault = 'RUB';
    axios.get(`https://api.exchangeratesapi.io/latest`, {
      params: {
        base: baseDefault
      }
    })
      .then(res => {
        const rates = res.data.rates;
        this.setState({base: baseDefault});
        this.setState({rates: Object.entries(rates)});
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <div>
        <DropdownButton id="dropdown-size-small"
                        title={this.state.base}>
          {this.state.rates.map(rate => <Dropdown.Item className={this.state.base === rate[0] ? 'active' : ''}
                                                       eventKey={rate[0]}
                                                       onSelect={this.chooseCurrency}>{rate[0]}</Dropdown.Item>)}
        </DropdownButton>

        <Table striped bordered hover>
          <thead>
          <tr>
            <th>Currency</th>
            <th>Rate</th>
          </tr>
          </thead>
          <tbody>
          {this.state.rates.map(rate => this.state.base !== rate[0] ? <tr>
            <td>{rate[0]}</td>
            <td>{1 / rate[1]}</td>
          </tr> : '')}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default RatesList;