import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  Button,
  AsyncStorage
} from "react-native";
import { Icon } from "react-native-elements";
import SQL from '../../Handlers/SQL';
import { onLogin } from '../../actions/userAction';
import {connect} from 'react-redux';

const regexEmail = /^(([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}))$/;
const regexAZ = /^[A-Z0-9]*$/;
const regexNum = /^[0-9]*$/;
class Register extends Component {

  state = {
    userName: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    tel: ''
  }

  onRegister = async () => {
    if (!((regexAZ.test(this.state.userName.toUpperCase()) && this.state.userName != '') &&
      (this.state.password.length > 3 ) &&
      (regexEmail.test(this.state.email.toUpperCase()) && this.state.email != '') &&
      (regexAZ.test(this.state.firstName.toUpperCase()) && this.state.firstName != '') &&
      (regexAZ.test(this.state.lastName.toUpperCase()) && this.state.lastName != '') &&
      (regexAZ.test(this.state.lastName.toUpperCase()) && this.state.lastName != '') &&
      (regexNum.test(this.state.tel) && this.state.tel != ''))){
        alert('please fill every input and all inputs valid');
        return;
      }

      try {
        const { userName, password, firstName, lastName, email, tel } = this.state;
        const user = await SQL.Register(userName, password, firstName, lastName, email, tel)
        await this.props.onLogin(user.User);

        this.props.navigation.navigate('HomeNav');

      } catch (error) {
        console.log(error);
        alert(error);
      }

  };

  render() {
    return (
      <View style={styles.container}>

        <TextInput
          style={[styles.input, { borderWidth: 1, borderColor: regexAZ.test(this.state.userName.toUpperCase()) || this.state.userName == '' ? 'transparent' : '#E74C3C' }]}
          placeholder="שם משתמש"
          placeholderTextColor="#ECF0F1"
          underlineColorAndroid="transparent"
          value={this.state.userName}
          onChangeText={(text) => { this.setState({ userName: text }) }}
        />
        <TextInput
          style={[styles.input, { borderWidth: 1, borderColor: this.state.password.length > 3 || this.state.password == '' ? 'transparent' : '#E74C3C' }]}
          placeholder="סיסמא"
          secureTextEntry={true}
          placeholderTextColor="#ECF0F1"
          underlineColorAndroid="transparent"
          value={this.state.password}
          onChangeText={(text) => { this.setState({ password: text }) }}
        />
        <TextInput
          style={[styles.input, { borderWidth: 1, borderColor: regexEmail.test(this.state.email.toUpperCase()) || this.state.email == '' ? 'transparent' : '#E74C3C' }]}
          placeholder="כתובת דואר אלקטרוני"
          keyboardType="email-address"
          placeholderTextColor="#ECF0F1"
          underlineColorAndroid="transparent"
          value={this.state.email}
          onChangeText={(text) => { this.setState({ email: text }) }}
        />
        <TextInput
          style={[styles.input, { borderWidth: 1, borderColor: regexAZ.test(this.state.firstName.toUpperCase()) || this.state.firstName == '' ? 'transparent' : '#E74C3C' }]}
          placeholder="שם פרטי"
          placeholderTextColor="#ECF0F1"
          underlineColorAndroid="transparent"
          value={this.state.firstName}
          onChangeText={(text) => { this.setState({ firstName: text }) }}
        />
        <TextInput
          style={[styles.input, { borderWidth: 1, borderColor: regexAZ.test(this.state.lastName.toUpperCase()) || this.state.lastName == '' ? 'transparent' : '#E74C3C' }]}
          placeholder="שם משפחה"
          placeholderTextColor="#ECF0F1"
          underlineColorAndroid="transparent"
          value={this.state.lastName}
          onChangeText={(text) => { this.setState({ lastName: text }) }}
        />
        <TextInput
          style={[styles.input, { borderWidth: 1, borderColor: regexNum.test(this.state.tel) || this.state.tel == '' ? 'transparent' : '#E74C3C' }]}
          placeholder="מספר טלפון"
          keyboardType="phone-pad"
          placeholderTextColor="#ECF0F1"
          underlineColorAndroid="transparent"
          value={this.state.tel}
          onChangeText={(text) => { this.setState({ tel: text }) }}
        />

        <Button title='הירשם' onPress={this.onRegister} color='#3498DB' />

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



const mapDispatchToProps = (dispatch) => ({
  onLogin: (userDetails) => dispatch(onLogin(userDetails)),
  SetSites: (Sites) => dispatch(SetSites(Sites))

})

export default connect(null, mapDispatchToProps)(Register);
