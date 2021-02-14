import logo from './logo.svg';
import React, { Fragment } from "react";
import { MDBBtn } from "mdbreact";
import Nav from './Nav';
import Summary from './components/Summary';
import TimeSheet from './components/TimeSheet';
import Profile from './components/Profile';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Link} from 'react-router-dom';


function App() {



  return (
    <Router>
    <div className="App">
    <Nav></Nav>
    <Switch>
      <Route path ="/"  exact component={Summary}/>
      <Route path="/timesheet" component={TimeSheet}/>
      <Route path="/profile" component={Profile}/>
      </Switch>
    </div>
    </Router>

  );
}

export default App;
