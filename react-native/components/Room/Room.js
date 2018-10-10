import React, { Component } from 'react'
import { FlatList, View, RefreshControl, StyleSheet, Dimensions } from 'react-native'
import { connect } from 'react-redux';
import FaultPreview from '../Fault/FaultPreview';
import { Icon } from 'react-native-elements';
import Modal from '../General/Modal';
import AddFault from '../Fault/AddFault';
import Empty from '../General/Empty';

class Room extends Component {
  state = {
    refreshing: false,
    modalVisible: false
  }

  _onRefresh = () => {

  }

  openModal = () => this.setState((pervState) => ({ modalVisible: !pervState.modalVisible }))
  Close = () => { this.setState({ modalVisible: false }) }


  _ListEmptyComponent = () => <Empty />
  _ItemSeparatorComponent = () => <View style={{ width, height: 2, backgroundColor: '#E74C3C', marginVertical: 7 }}></View>
  _keyExtractor = (fault) => fault.FaultId.toString();
  _renderItem = (fault) => <FaultPreview fault={fault.item} />
  render() {
    return (
      <View>

        <View style={{ flexDirection: 'row' }}>
        {this.props.TypeId == 1 ?    
           <Icon
            type="ionicon"
            name="ios-add-circle-outline"
            size={40}
            color="#ECF0F1"
            underlayColor="transparent"
            onPress={this.openModal}
          />: null}
      
        </View>

        <FlatList
          ListEmptyComponent={this._ListEmptyComponent}
          ItemSeparatorComponent={this._ItemSeparatorComponent}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          data={this.props.Faults.filter(fault=>fault.SiteId == this.props.SiteId && fault.RoomId == this.props.RoomId)}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />


        <Modal Toggle={this.openModal} visible={this.state.modalVisible}>
          <AddFault Close={this.Close} />
        </Modal>

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
    Faults: state.faults,
    SiteId: state.curSite,
    RoomId: state.curRoom,
    TypeId: state.curType
  }
}

export default connect(mapStateToProps)(Room);