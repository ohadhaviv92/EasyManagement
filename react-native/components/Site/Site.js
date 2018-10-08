import React, { Component } from 'react'
import { FlatList, View, RefreshControl, StyleSheet, Dimensions } from 'react-native'
import { connect } from 'react-redux';
import RoomPreview from '../Room/RoomPreview';
import Empty from '../General/Empty';
import { Icon } from 'react-native-elements';
import Modal from '../General/Modal';
import AddRoom from '../Room/AddRoom';

class Site extends Component {
  state = {
    refreshing: false,
    jobId: NaN,
    site: null,
    modalVisible: false
  }

  componentDidMount() {
    const site = (this.props.Sites.filter(site => site.SiteId == this.props.Rooms.SiteID))[0];
    this.setState({ site });

  }

  _onRefresh = () => {

  }

  openModal = () => this.setState((pervState) => ({ modalVisible: !pervState.modalVisible }))

  Close = () => { this.setState({ modalVisible: false }) }

  _ListEmptyComponent = () => <Empty />
  _ItemSeparatorComponent = () => <View style={{ width, height: 2, backgroundColor: 'white', marginVertical: 7 }}></View>
  _keyExtractor = (room) => room.RoomId.toString();
  _renderItem = (room) => <RoomPreview room={room.item} navigation={this.props.navigation} />
  render() {
    return (
      <View>

        <View style={{ flexDirection: 'row' }}>

          <Icon
            type="ionicon"
            name="ios-add-circle-outline"
            size={40}
            color="#ECF0F1"
            underlayColor="transparent"
            onPress={this.openModal}
          />
        </View>

        <Modal Toggle={this.openModal} visible={this.state.modalVisible}>
          <AddRoom Close={this.Close} />
        </Modal>

        <FlatList
          ListEmptyComponent={this._ListEmptyComponent}
          ItemSeparatorComponent={this._ItemSeparatorComponent}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          data={this.props.Rooms.details}
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
    Sites: state.sites,
    Rooms: state.rooms
  }
}

export default connect(mapStateToProps)(Site);