import React from 'react';
import {  createSwitchNavigator } from 'react-navigation';
import AuthNav from './AuthNav';
import HomeNav from './HomeNav';

export default class App extends React.Component {

  render() {
    return ( <AppNav />);
  }
}



const AppNav = createSwitchNavigator({
  AuthNav,
  HomeNav
});
