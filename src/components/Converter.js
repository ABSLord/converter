import React, {Component} from 'react';
import {Form, Col, Button, Dropdown, DropdownButton} from "react-bootstrap";
import axios from "axios";
import './dropdown.css'

const h3Style = {
  backgroundColor: 'lightseagreen',
  borderRadius: '10px',
  padding: '15px',
  fontSize: '30px',
  margin: '10px'
}

class Converter extends Component {
  state = {
    rates: [],
    from: '',
    to: '',
    amount: null,
    result: null
  }

  chooseFromCurrency = (curr, evt) => {
    evt.preventDefault();
    axios.get(`https://api.exchangeratesapi.io/latest`, {
      params: {
        base: curr,
      }
    })
      .then(res => {
        const rates = res.data.rates;
        this.setState({from: curr});
        this.setState({rates: Object.entries(rates)});
      })
      .catch(err => {
        console.log(err)
      })
  }

  chooseToCurrency = (curr, evt) => {
    evt.preventDefault();
    this.setState({to: curr});
  }

  convertHandler = (evt) => {
    evt.preventDefault();
    const result = this.state.amount * (this.state.rates.filter(elem => elem[0] === this.state.to)[0][1]);
    this.setState({result: result});
  }

  componentDidMount() {
    const fromDefault = 'RUB';
    const toDefault = 'USD';
    axios.get(`https://api.exchangeratesapi.io/latest`, {
      params: {
        base: fromDefault,
      }
    })
      .then(res => {
        const rates = res.data.rates;
        this.setState({from: fromDefault});
        this.setState({to: toDefault});
        this.setState({rates: Object.entries(rates)});
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <div>
        <Form>
          <Form.Row>
            <Col md="8">
              <Form.Control placeholder="Amount" onChange={event =>
                this.setState({ amount: event.target.value })}/>
            </Col>
            <Col>
              <DropdownButton title={this.state.from}>
                {this.state.rates.map(rate => <Dropdown.Item className={this.state.from === rate[0] ? 'active' : ''}
                                                             eventKey={rate[0]}
                                                             onSelect={this.chooseFromCurrency}>{rate[0]}</Dropdown.Item>)}
              </DropdownButton>
            </Col>
            <Col>
              <DropdownButton title={this.state.to}>
                {this.state.rates.map(rate => <Dropdown.Item className={this.state.to === rate[0] ? 'active' : ''}
                                                             eventKey={rate[0]}
                                                             onSelect={this.chooseToCurrency}>{rate[0]}</Dropdown.Item>)}
              </DropdownButton>
            </Col>
            <Col>
              <Button variant="success" onClick={this.convertHandler}>
                Convert
              </Button>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col md="12">
              <h3 style={h3Style}>{this.state.result ? this.state.result : ''}</h3>
            </Col>
          </Form.Row>
        </Form>
      </div>
    )
  }
}

export default Converter;