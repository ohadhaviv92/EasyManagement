import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, TextInput, Image } from 'react-native'
import { Icon } from 'react-native-elements'

export default class Login extends Component {

state = {
  userName: '',
  Password: ''
}

  render() {
    return (
      <View style={{marginTop: height*0.2}}>
      <Image source={require('../../assets/Confirm.png')} style={styles.confirm}/>
        <View style={styles.title}>
          <Text style={styles.text_big}>LOGIN</Text>
          <Text style={styles.text_small}>/ Sign up</Text>
        </View>

        <View style={styles.container}>

          <TextInput
            style={styles.input}
            placeholder='User name'
            keyboardType='email-address'
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
            onChangeText= {(text)=>{this.setState({userName: text})}}
          />

          <TextInput
            style={styles.input}
            placeholder='Password'
            secureTextEntry={true}
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
            onChangeText= {(text)=>{this.setState({Password: text})}}
          />

        </View>

        <View style={styles.Arrow}>
          <Icon
            type='ionicon'
            name='ios-arrow-forward'
            size={50}
            color='#ffdd00'
            underlayColor='transparent'
            onPress={() => this.props.navigation.navigate('Register')} />
        </View>
        
      </View>
    )
  }
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  confirm:{
    position:'absolute',
    top: -100,
    left: 30
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    width: width - 80,
    height: 40,
    marginHorizontal: 20,
    paddingLeft: 45,
    borderRadius: 20,
    color: '#ffffff',
    marginBottom: 10
  },
  title: {
    flexDirection: 'row',
    marginLeft: 30
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 130

  },
  text_small: {
    color: 'white',
    fontSize: 20,
    marginTop: 20
  },
  text_big: {
    color: 'white',
    fontSize: 40
  },
  Arrow: {
    position: 'absolute',
    right: 10,
    top: height / 4
  },

  hexagon: {
    width: 100,
    height: 55
  },
  hexagonInner: {
    width: 100,
    height: 55,
    backgroundColor: '#ffdd00'
  },
})