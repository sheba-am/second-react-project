import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import DishDetail from './DishdetailComponent';
import { DISHES } from '../shared/dishes';
import { Switch, Route, Redirect } from 'react-router-dom';


class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
        dishes: DISHES,
    };
  }




  render() {

    const HomePage = () => {
      return(
          <Home 
          />
      );
    }



    return (
      <div>
        <Header />
          <Switch>
                <Route path='/home' component={HomePage} />
                <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
                <Redirect to="/home" />
            </Switch>
        <Footer />

      </div> // when you filter the array the answer is another array containing all of the objects which have equal conditions
      // here we want the first one so we choose [0] 
    );
  }
}

export default Main;
