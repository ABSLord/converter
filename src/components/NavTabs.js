import React, {Component} from 'react';
import {Tab, Row, Nav, Col} from 'react-bootstrap'
import RatesList from './RatesList'
import Converter from './Converter'

class NavTabs extends Component {
  render() {
    return (
      <Tab.Container id="left-tabs" defaultActiveKey="first">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">Exchange rates</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Converter</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <RatesList/>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <Converter/>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    );
  }
}

export default NavTabs;