import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { NavItem } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PortfolioHome from "../PortfolioHome/portfolioHome";
import PortfolioDetailContainer from "../PortfolioDetail/PortfolioDetailContainer";
import Login from "./Login";
import { logoutUser } from '../../utils/api';
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";


const Header = () => {
  const history = useHistory();

  const handleLogout = ()=> {
    logoutUser()
    .then((res)=>{
      localStorage.clear();
      window.location.replace(`/login/`);
    })
  }

  return (
    <Router>
    <ToastContainer/>
      <div className="vh-100 bg-light">
        <Navbar bg="dark text-warning" expand="lg" sticky="top">
          <Navbar.Brand as={Link} to="/portfolio-home">
          <div className="d-flex align-items-center">
            <h4 class="text-warning mr-2">Portfolio Testing</h4>
            <FontAwesomeIcon icon={faChartLine} size="lg" className="text-white" />
          </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="w-100">
              <div className="d-flex w-100 justify-content-between">
                {localStorage.getItem('token') ? <Nav.Link as={Link} to="/portfolio-home" className="text-white">
                  Home
                </Nav.Link>:null}
                  {localStorage.getItem('token') ?
                    <button onClick={handleLogout} type="button" class="btn btn-info">Logout</button>
                  :null}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route
            path="/portfolio-home/:portfolioId?"
            component={PortfolioHome}
          />
          <Route path="/login/" component={Login} />
          <Route
            exact
            path="/portfolio/:portfolioId"
            component={PortfolioDetailContainer}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default Header;
