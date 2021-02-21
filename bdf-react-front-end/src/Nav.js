import React, { Component } from 'react'
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
    } from "mdbreact";
  
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
import Cookies from 'js-cookie';



class Nav extends Component {
state = {
  isOpen: false
};

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

handleOnClick = () =>{
  Cookies.remove('JWT-TOKEN');
  window.location.reload(true);
}

render() {
  return (
      <MDBNavbar color="indigo" dark expand="md">
        <MDBNavbarBrand>
          <strong className="white-text">BFS</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem active>
              <MDBNavLink tag={Link} to="/">Home</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink tag={Link} to="/timesheet">Timesheet</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink tag={Link} to="/profile">Profile</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <span className="mr-2">More Action</span>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem onClick={this.handleOnClick}>LogOut</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBFormInline waves>
                <div className="md-form my-0">
                  <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                </div>
              </MDBFormInline>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}

export default Nav;
