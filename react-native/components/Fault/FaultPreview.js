import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
class FaultPreivew extends Component {


  onSiteClick = async() => {
    console.log(this.props.fault);
    
  }

  render() {    
    const {fault} = this.props;

    return (
      <TouchableOpacity onPress={this.onSiteClick}>
      <View style={styles.container}>
      <Image style={{width: 100, height: 100}} source={{uri: 'https://via.placeholder.com/100x100'}}/> 
      <View style={{flexDirection: 'column'}}>
        <Text style={styles.text}>{fault.FaultName}</Text>
        <Text style={styles.text}>{fault.Info}</Text>
        <Text style={styles.text}>סטטוס תקלה: {fault.FaultStatus ? 'פתוח' : 'סגור'}</Text>
      </View>
      
   
      </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#E74C3C'
  },
  text: {
    fontSize: 21,
    color: '#ECF0F1',
  }

})



export default FaultPreivew;
