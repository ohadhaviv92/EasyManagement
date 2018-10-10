import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import {SetCurRoom} from '../../actions/roomAction';
import {connect} from 'react-redux';
class PreviewRoom extends Component {


  onSiteClick = async() => {
    this.props.SetCurRoom(this.props.room.RoomId)
    this.props.navigation.navigate('Room');
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
    backgroundColor: '#3498DB'
  },
  text: {
    fontSize: 21,
    color: '#ECF0F1',
  }

})


const mapDispatchToProps = (dispatch) => ({
  SetCurRoom: (RoomId) => dispatch(SetCurRoom(RoomId))
})

export default connect(null, mapDispatchToProps)(PreviewRoom);
