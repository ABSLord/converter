import React, {Component} from 'react';
import {Navbar} from 'react-bootstrap';

class Header extends Component {
  render() {
    return (
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="#">Currency manager</Navbar.Brand>
      </Navbar>
    );
  }
}

export default Header;