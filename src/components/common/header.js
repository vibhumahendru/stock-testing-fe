import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import React from 'react';
import { LinkContainer } from "react-router-bootstrap";
import {NavItem } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import PortfolioHome from '../PortfolioHome/portfolioHome'


const Header = () => {

  return (
    <Router>
    <div>
    <Navbar bg="secondary text-light" expand="lg" sticky="top">
    <Navbar.Brand as={Link} to="/"><h4 class="text-light">Portfolio Testing</h4></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/portfolio-home" className="text-warning">Home</Nav.Link>
        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
        <Switch>
          <Route path="/portfolio-home" component={PortfolioHome}/>
        </Switch>
  </div>
  </Router>
  );
}




export default Header;
