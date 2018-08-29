import React, { Component } from "react";
import {
  View,
  Dimensions
} from "react-native";
import { createMaterialTopTabNavigator } from "react-navigation";
import { Constants } from 'expo';
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import KeyboardSpacer from 'react-native-keyboard-spacer';



const { height, width } = Dimensions.get("window");


const AuthNav = createMaterialTopTabNavigator(
  {
    Login,
    Register
  },
  {
    swipeEnabled: true,
    lazy: true,
    tabBarComponent: null
  }
);

export default class AuthScreen extends Component {
  static router = AuthNav.router;

  render() {

    return (
      <View
        style={{
          width,
          height,
          backgroundColor: '#2C3E50',
        }}
      >
        <AuthNav navigation={this.props.navigation} />
        <KeyboardSpacer />
      </View>
    );
  }
}
