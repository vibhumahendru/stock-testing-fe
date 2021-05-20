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
import PortfolioDetailContainer from '../PortfolioDetail/PortfolioDetailContainer'


const Header = () => {

  return (
    <Router>
    <div>
    <Navbar bg="dark text-warning" expand="lg" sticky="top">
    <Navbar.Brand as={Link} to="/"><h4 class="text-warning">Portfolio Testing</h4></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/portfolio-home" className="text-white">Home</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
        <Switch>
          <Route path="/portfolio-home/:portfolioId?" component={PortfolioHome}/>
          <Route exact path="/portfolio/:portfolioId" component={PortfolioDetailContainer}/>
        </Switch>
  </div>
  </Router>
  );
}




export default Header;
