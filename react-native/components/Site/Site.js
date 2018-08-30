import React, { Component } from 'react'
import { Text, FlatList, View ,RefreshControl, StyleSheet, Dimensions } from 'react-native'
import {connect} from 'react-redux';
import RoomPreview from '../Room/RoomPreview';

class Site extends Component {
    state = {
        refreshing: false
      }
     
      _onRefresh = () => {
    
      }
    
      _ListEmptyComponent = () => {
        return(
          <View style={styles.container}>
            <Text style={styles.text}>Empty</Text>
          </View>
        );
      }
      _keyExtractor = (room) => room.RoomId.toString();
      _renderItem = (room) => <RoomPreview room={room.item} />
      render() {
        return (
          <View>
            <FlatList
            ListEmptyComponent = {this._ListEmptyComponent}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh}
                />
              }
              data={this.props.Rooms}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
            />
          </View>
        )
      }
    }
    
    
    const { width, height } = Dimensions.get("window");
    
    const styles = StyleSheet.create({
      container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E74C3C',
        marginTop: height/2.5,
      },
      text: {
        fontSize: 21,
        color: '#ECF0F1',
      }
    
    })


const mapStateToProps = state => {
    return {
      Rooms: state.rooms
    }
  }
  
  export default connect(mapStateToProps)(Site);