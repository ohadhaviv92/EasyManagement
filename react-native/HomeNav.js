import React, { Component } from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ScrollView,
  AsyncStorage
} from "react-native";
import Home from './components/Home/Home';
import { createDrawerNavigator, DrawerItems } from 'react-navigation';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Icon } from "react-native-elements";


const DrawerWithLogoutButton = (props) => (

  <ScrollView contentContainerStyle={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
    <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
      <DrawerItems {...props} />
    </SafeAreaView>
    <TouchableOpacity onPress={async()=> {await AsyncStorage.clear(); props.navigation.navigate('AuthNav')}}>
      <View style={styles.item}>
      <View style={styles.iconContainer}>
        <Icon
          type="simple-line-icon"
          name="logout"
          size={20}
          underlayColor="transparent"
        />
        </View>
        <Text style={styles.label}>Logout</Text>
      </View>
    </TouchableOpacity>
  </ScrollView>

);

/*
      <View style={styles.iconContainer}>
        <Image source={require('./img/logout.png')} style={styles.icon}></Image>
      </View>
*/

const HomeNav = createDrawerNavigator(
  {
    Home,
  }, {
    contentComponent: DrawerWithLogoutButton,
  }
);


export default class AppScreen extends Component {
  static router = HomeNav.router;

  render() {

    return (

      <View
        style={{
          width,
          height: height,
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

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginBottom: 48,
    marginLeft: 10,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, .87)',
  },
  iconContainer: {
    marginBottom: 46,
    width: 24,
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  }
});