import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import AuthNav from './AuthNav';
import HomeNav from './HomeNav';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';



const store = configureStore();
export default class App extends React.Component {

  render() {
    return (
      <Provider store= {store}>
        <AppNav />
      </Provider>);
  }
}



const AppNav = createSwitchNavigator({
  AuthNav,
  HomeNav
});
