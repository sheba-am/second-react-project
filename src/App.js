import logo from './logo.svg';
import './App.css';
//import React from 'react';
 import React, { Component } from "react";
 import Menu from './components/MenuComponent';
 import { Navbar, NavbarBrand } from 'reactstrap';
 import { DISHES } from './shared/dishes';
import Main from './components/MainComponent'

class App extends Component {



  render() {
    return (
      <div className="App">
        <Main />
      </div>
    )
  }
}

export default App;
