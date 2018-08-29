import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Alert,
  AsyncStorage,
  Button,
  TextInput
} from "react-native";
import { Icon } from "react-native-elements";
import SQL from "../../Handlers/SQL";

export default class Login extends Component {
  state = {
    userName: "",
    Password: ""
  };

  onLogin = async () => {
    try {
      const user = await SQL.Login(this.state.userName, this.state.Password);
      await AsyncStorage.setItem("user", JSON.stringify(user));
      this.props.navigation.navigate("HomeNav");
    } catch (error) {
      console.log(error);
      Alert.alert(error, "", [{ text: "OK" }]);
    }
  };

  async componentDidMount() {
    const user = JSON.parse(await AsyncStorage.getItem('user'));
    if (user != undefined) {
      this.props.navigation.navigate("HomeNav");
    }
  }

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
          onChangeText={(text) => { this.setState({ Password: text }) }}
        />
        <Button title='Login' onPress={this.onLogin} color='#3498DB'/>
       
        <View style={styles.Arrow}>
          <Icon
            type="ionicon"
            name="ios-arrow-forward"
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
    right: 10,
  },

});
