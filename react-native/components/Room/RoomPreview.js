import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity,Image } from 'react-native'
import { SetCurRoom } from '../../actions/roomAction';
import { connect } from 'react-redux';
class PreviewRoom extends Component {


  onSiteClick = async () => {
    this.props.SetCurRoom(this.props.room.RoomId)
    this.props.navigation.navigate('Room');
  }

  render() {
    const { room } = this.props;

    return (

      <View style={{overflow: 'hidden',}}>
      <TouchableOpacity onPress={this.onSiteClick}>
      
        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor:"#3498DB"
        }}>
                  <Image
            source={(room.RoomPicture == null || room.RoomPicture == '') ? require('../../assets/room.png') : { uri: room.RoomPicture }}
            style={styles.img}
          />
          <Text style={styles.text}>{room.RoomTypeName}</Text>
          <Text style={styles.text}>{room.RoomName}</Text>
          <Text style={styles.text}>קומה: {room.FloorNumber}</Text>
        </View>
      </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498DB'
  },
  text: {
    flex: 1,
    fontSize: 21,
    color: '#ECF0F1',
  },
  img: {
    marginLeft: 3,
    marginTop:3,
    marginBottom: 3,
    flex: 1,
    width: 90,
    height: 100,

  },

})


const mapDispatchToProps = (dispatch) => ({
  SetCurRoom: (RoomId) => dispatch(SetCurRoom(RoomId))
})

export default connect(null, mapDispatchToProps)(PreviewRoom);
