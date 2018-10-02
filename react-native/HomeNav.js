import React, { Component } from 'react';
import {
  View,
  Dimensions
} from "react-native";
import Home from './components/Home/Home';
import Settings from './components/General/Settings';
import Site from './components/Site/Site';
import Invite from './components/Invite/Invite';
import { createDrawerNavigator } from 'react-navigation';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import DraweMenu from './DrawerMenu';
import Room from './components/Room/Room';


const HomeNav = createDrawerNavigator(
  {
    Home: {
      navigationOptions: {
        drawerLabel: 'חדש בית',
      },
      screen: Home
    },
    Invite: {
      navigationOptions: {
        drawerLabel: 'הזמנות',
      },
      screen: Invite
    },
    Settings: {
      navigationOptions: {
        drawerLabel: 'הגדרות',
      },
      screen: Settings
    },
    Site: {
      screen: Site,
      navigationOptions: {
        drawerLabel: () => null,
      }
    },
    Room: {
      screen: Room,
      navigationOptions: {
        drawerLabel: () => null,
      }
    },
  }, {
    contentComponent: DraweMenu,
  }
);


export default class AppScreen extends Component {
  static router = HomeNav.router;

  render() {

    return (

      <View
        style={{
          width,
          height,
          backgroundColor: '#2C3E50'
        }}
      >
        <HomeNav navigation={this.props.navigation} />
        <KeyboardSpacer />
      </View>
    );
  }
}



const { height, width } = Dimensions.get("window");


