import React from 'react';
import {  createSwitchNavigator } from 'react-navigation';
import AuthNav from './AuthNav';
import Home from './components/Home/Home';

export default class App extends React.Component {
  render() {
    return ( <AppNav />);
  }
}



const AppNav = createSwitchNavigator({
  AuthNav,
  Home
});
