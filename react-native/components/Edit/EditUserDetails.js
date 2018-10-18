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


class EditUserDetails extends Component {

  state = {
    userName: this.props.User.UserName,
    email: this.props.User.Email,
    firstName: this.props.User.FirstName,
    lastName: this.props.User.LastName,
    tel: this.props.User.Tel,
    img:""
  }

  onRegister = async () => {
    if (!((regexAZ.test(this.state.userName.toUpperCase()) && this.state.userName != '') &&
      (regexEmail.test(this.state.email.toUpperCase()) && this.state.email != '') &&
      (regexAZ.test(this.state.firstName.toUpperCase()) && this.state.firstName != '') &&
      (regexAZ.test(this.state.lastName.toUpperCase()) && this.state.lastName != '') &&
      (regexAZ.test(this.state.lastName.toUpperCase()) && this.state.lastName != '') &&
      (regexNum.test(this.state.tel) && this.state.tel != ''))){
        alert('please fill every input and all inputs valid');
        return;
      }

      try {
        const { userName, firstName, lastName, email, tel } = this.state;
        
        const user = await SQL.EditUserDetails(this.props.User.UserId ,userName, firstName, lastName, email, tel,this.state.img)
        
        await this.props.onLogin(user);
        
        alert("הפרטים שונו בהצלחה");
        
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

        <Button title='ערוך' onPress={this.onRegister} color='#3498DB' />


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

const mapStateToProps = (state) => ({
    User: state.user,
  });
  

export default connect(mapStateToProps, mapDispatchToProps)(EditUserDetails);
