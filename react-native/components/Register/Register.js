import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions,TextInput, Image } from 'react-native'
import { Icon } from 'react-native-elements'

export default class Register extends Component {
  render() {
    return (
      <View style={{marginTop: height*0.2}}>
      <Image source={require('../../assets/Confirm.png')} style={styles.confirm}/>
       <View style={styles.title}>
          <Text style={styles.text_big}>Sign up</Text>
          <Text style={styles.text_small}>/ LOGIN</Text>
        </View>
        <View style={styles.container}>
        <TextInput
            style={styles.input}
            placeholder='User name'
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
          />

          <TextInput
            style={styles.input}
            placeholder='Password'
            secureTextEntry={true}
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
          />
             <TextInput
            style={styles.input}
            placeholder='Email'
            keyboardType='email-address'
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
          />
             <TextInput
            style={styles.input}
            placeholder='First name'
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
          />
             <TextInput
            style={styles.input}
            placeholder='Last name'
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
          />
             <TextInput
            style={styles.input}
            placeholder='Phone number'
            keyboardType='phone-pad'
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
          />
        </View>
        
        <View style={styles.Arrow}>
            <Icon
              type='ionicon'
              name='ios-arrow-back'
              size={50}
              color='#ffdd00'
              underlayColor='transparent'
              onPress={() => this.props.navigation.navigate('Login')} />
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
  title:{
    marginBottom: 50,
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
    left: 10,
    top: height / 4
  }
})