import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  Button
} from "react-native";
import { Icon } from "react-native-elements";
import SQL from '../../Handlers/SQL';
export default class Register extends Component {

  state = {
    userName: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    tel: ''
  }

  onRegister = async () => {
    try {
      const { userName, password, firstName, lastName, email, tel } = this.state;
      const user = await SQL.Register(userName, password, firstName, lastName, email, tel)
      await AsyncStorage.setItem("user", JSON.stringify(user));
      console.log(user);

      this.props.navigation.navigate('HomeNav');

    } catch (error) {
      console.log(error);

    }

  };

  render() {
    return (
      <View style={styles.container}>

        <TextInput
          style={styles.input}
          placeholder="User name"
          placeholderTextColor="#ECF0F1"
          underlineColorAndroid="transparent"
          onChangeText={(text) => { this.setState({ userName: text }) }}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="#ECF0F1"
          underlineColorAndroid="transparent"
          onChangeText={(text) => { this.setState({ password: text }) }}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor="#ECF0F1"
          underlineColorAndroid="transparent"
          onChangeText={(text) => { this.setState({ email: text }) }}
        />
        <TextInput
          style={styles.input}
          placeholder="First name"
          secureTextEntry={true}
          placeholderTextColor="#ECF0F1"
          underlineColorAndroid="transparent"
          onChangeText={(text) => { this.setState({ firstName: text }) }}
        />
        <TextInput
          style={styles.input}
          placeholder="Last name"
          placeholderTextColor="#ECF0F1"
          underlineColorAndroid="transparent"
          onChangeText={(text) => { this.setState({ lastName: text }) }}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          keyboardType="phone-pad"
          placeholderTextColor="#ECF0F1"
          underlineColorAndroid="transparent"
          onChangeText={(text) => { this.setState({ tel: text }) }}
        />

        <Button title='Register' onPress={this.onRegister} color='#3498DB'/>

        <View style={styles.Arrow}>
          <Icon
            type="ionicon"
            name="ios-arrow-back"
            size={50}
            color="#ECF0F1"
            underlayColor="transparent"
            onPress={() => this.props.navigation.navigate("Login")}
          />
        </View>

      </View>
    );
  }
}
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: "#2980B9",
    width: width - 80,
    height: 40,
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 15,
    color: "#ffffff",
  },
  Arrow: {
    position: "absolute",
    left: 10,
  }
});
