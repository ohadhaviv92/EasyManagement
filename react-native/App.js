import React from 'react';
import {  createSwitchNavigator } from 'react-navigation';
import AuthNav from './AuthNav';

export default class App extends React.Component {

  render() {
    return ( <AppNav />);
  }
}



const AppNav = createSwitchNavigator({
  AuthNav,
});
