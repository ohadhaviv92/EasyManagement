import React, { Component } from 'react'
import { Text, View, AsyncStorage } from 'react-native'
import PreviewSite from '../Site/PreviewSite';

export default class Home extends Component {
state = {
  user: {}
}
  async componentDidMount(){
    const user = JSON.parse(await AsyncStorage.getItem('user'));
    this.setState({user})
   
    
  }
  render() {
    
    return (
      <View>
        <PreviewSite user={this.state.user}/>
      </View>
    )
  }
}