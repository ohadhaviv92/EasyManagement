import React, { Component } from 'react'
import { FlatList, View, RefreshControl, StyleSheet, Dimensions } from 'react-native'
import { connect } from 'react-redux';
import FaultPreview from '../Fault/FaultPreview';
import Empty from '../General/Empty';

class Room extends Component {
  state = {
    refreshing: false
  }

  _onRefresh = () => {

  }


  _ListEmptyComponent = () => <Empty />
  _ItemSeparatorComponent = () => <View style={{ width, height: 2, backgroundColor: '#E74C3C', marginVertical: 7 }}></View>
  _keyExtractor = (fault) => fault.FaultId.toString();
  _renderItem = (fault) => <FaultPreview fault={fault.item} />
  render() {
    return (
      <View>
        <FlatList
          ListEmptyComponent={this._ListEmptyComponent}
          ItemSeparatorComponent={this._ItemSeparatorComponent}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          data={this.props.Faults}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    )
  }
}


const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E74C3C',
    marginTop: height / 2.5,
  },
  text: {
    fontSize: 21,
    color: '#ECF0F1',
  }

})


const mapStateToProps = state => {
  return {
    Faults: state.faults.details,
    RoomID: state.faults.RoomID
  }
}

export default connect(mapStateToProps)(Room);