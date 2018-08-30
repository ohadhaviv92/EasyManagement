import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

class PreviewRoom extends Component {


  onSiteClick = async() => {
    console.log(this.props.room);
    
  }

  render() {    
    const {room} = this.props;

    return (
      <TouchableOpacity onPress={this.onSiteClick}>
      <View style={styles.container}>
        <Text style={styles.text}>{room.RoomName}</Text>
        <Text style={styles.text}>{room.RoomTypeName}</Text>
        <Text style={styles.text}>Floor: {room.FloorNumber}</Text>
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

export default PreviewRoom;
