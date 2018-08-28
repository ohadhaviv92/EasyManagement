import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  Image,
  TouchableOpacity
} from "react-native";
import { Icon } from "react-native-elements";
import SQL from '../../Handlers/SQL';
export default class Register extends Component {

  state = {
    userName: '',
    password: '',
    email:'',
    firstName: '',
    lastName: '',
    tel: ''
  }

  onRegister = async() => {
    try {
      const {userName , password, firstName, lastName ,email,tel} = this.state; 
      const user = await SQL.Register(userName , password, firstName, lastName ,email,tel)
      await AsyncStorage.setItem("user", JSON.stringify(user));
      console.log(user);
      
      this.props.navigation.navigate('Home');
      
    } catch (error) {
      console.log(error);
      
    }

  };

  render() {
    return (
      <View style={{ marginTop: height * 0.05, height: height * 0.7 }}>
        <TouchableOpacity onPress={this.onRegister}>
          <Image
            source={require("../../assets/Confirm.png")}
            style={styles.confirm}
          />
        </TouchableOpacity>
        <View style={styles.title}>
          <Text style={styles.text_big}>Sign up</Text>
          <Text style={styles.text_small}>/ LOGIN</Text>
        </View>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="User name"
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
            onChangeText={(text)=>{this.setState({userName: text})}}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
            onChangeText={(text)=>{this.setState({password: text})}}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
            onChangeText={(text)=>{this.setState({email: text})}}
          
          />
          <TextInput
            style={styles.input}
            placeholder="First name"
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
            onChangeText={(text)=>{this.setState({firstName: text})}}
          
          />
          <TextInput
            style={styles.input}
            placeholder="Last name"
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
            onChangeText={(text)=>{this.setState({lastName: text})}}
          
          />
          <TextInput
            style={styles.input}
            placeholder="Phone number"
            keyboardType="phone-pad"
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
            onChangeText={(text)=>{this.setState({tel: text})}}
          
          />
        </View>

        <View style={styles.Arrow}>
          <Icon
            type="ionicon"
            name="ios-arrow-back"
            size={50}
            color="#ffdd00"
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
  confirm: {
    marginLeft: 30
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    width: width - 80,
    height: 40,
    marginHorizontal: 20,
    paddingLeft: 45,
    borderRadius: 20,
    color: "#ffffff",
    marginBottom: 10
  },
  title: {
    marginBottom: 50,
    flexDirection: "row",
    marginLeft: 30
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  text_small: {
    color: "white",
    fontSize: 20,
    marginTop: 20
  },
  text_big: {
    color: "white",
    fontSize: 40
  },
  Arrow: {
    position: "absolute",
    left: 10,
    top: height / 2.5
  }
});
