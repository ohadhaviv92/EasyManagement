import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

class FaultPreivew extends Component {


  onSiteClick = async() => {
    console.log(this.props.fault);
    
  }

  render() {    
    const {fault} = this.props;

    return (
      <TouchableOpacity onPress={this.onSiteClick}>
      <View style={styles.container}>
        <Text style={styles.text}>{fault.FaultName}</Text>
        <Text style={styles.text}>{fault.Info}</Text>
        <Text style={styles.text}>Open: {fault.FaultStatus ? 'פתוח' : 'סגור'}</Text>
      </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E74C3C'
  },
  text: {
    fontSize: 21,
    color: '#ECF0F1',
  }

})



export default FaultPreivew;
