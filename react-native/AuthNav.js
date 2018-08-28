import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, ImageBackground, Image, Animated, Easing } from 'react-native'
import {createMaterialTopTabNavigator} from 'react-navigation';
import {Constants} from 'expo';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Notification from './Handlers/Notification';


const AuthNav = createMaterialTopTabNavigator({
    Login,
    Register
  
  }, {
      swipeEnabled: true,
      lazy: true,
      tabBarComponent: null
    })

    
export default class AuthScreen extends Component {
    static router = AuthNav.router;
    state = {
      loginAnimation: new Animated.Value(height*0.2),
      logoAnimation: new Animated.Value(0),
    }
   

    componentDidMount() {

      //Notification.Register("orhay92@gmail.com");
        // Animated.timing(             
        //   this.state.loginAnimation,            
        //   {
        //     toValue: height,                   
        //     duration: 700,
        //     easing: Easing.linear,
        //   }
        // ).start();                      

        // Animated.timing(             
        //   this.state.logoAnimation,            
        //   {
        //     toValue: 200,                   
        //     duration: 1700,
        //     easing: Easing.linear,
        //   }
        // ).start();  
  
    }


    
  render() {
    const {loginAnimation, logoAnimation} = this.state;
    let logoAnimationY = logoAnimation.interpolate({
      inputRange: [0 , 200],
      outputRange: [0, -200],
    });
    return (
        <View style={styles.container} >

        <View style={{ marginTop: Constants.statusBarHeight }}>
          <Animated.Image 
          style={styles.Logo} 
          source={require('./assets/Logo.png')} 
          style = {{ position: 'absolute', height: 100, width: 100, right: 0, transform:[{ translateX: logoAnimation },{ translateY: logoAnimationY },{perspective: 1000 }]}} 
          />

          <Animated.View style = {{width , height: height*0.9, transform:[{ translateY: loginAnimation },{perspective: 1000 }]}} >
              <ImageBackground source={require('./assets/AuthBG.png')} style={{width: '100%', height: '100%'}}>
                <AuthNav navigation={this.props.navigation}/>
              </ImageBackground>
             
          </Animated.View>
        </View>

      </View>
    )
  }
}



const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({

  container: {
    position: 'absolute',
    width,
    height,
    backgroundColor: '#313131',
  },
  form: {
    width,
    height: height*0.9,
    marginTop: height*0.1
  }
});
